const COOKIE_NAME = "tp_access";
const TOKEN_PARAM = "t";

function base64UrlToBytes(input: string): Uint8Array {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((input.length + 3) % 4);
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function hmacSha256(key: string, message: Uint8Array): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, message);
  return new Uint8Array(sig);
}

function isLikelyAssetPath(pathname: string): boolean {
  // Anything with a file extension or Vite's assets folder should be treated as an asset.
  if (pathname.startsWith("/assets/")) return true;
  return /\.[a-z0-9]+$/i.test(pathname);
}

function noindexHeaders(): HeadersInit {
  return {
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "Cache-Control": "no-store",
  };
}

function unauthorizedResponse(): Response {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow" />
    <title>Restricted</title>
    <style>
      html, body { height: 100%; margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .wrap { min-height: 100%; display:flex; align-items:center; justify-content:center; padding: 32px; background: #0b0b0b; color: #fff; }
      .card { max-width: 560px; width: 100%; background: #151515; border: 1px solid rgba(255,255,255,0.12); padding: 24px; }
      a { color: #8ab4f8; }
      code { background: rgba(255,255,255,0.08); padding: 2px 6px; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <h1 style="margin:0 0 12px; font-size: 20px; font-weight: 600;">This page is restricted</h1>
        <p style="margin:0 0 12px; opacity:0.9; line-height:1.5;">
          Please use the access link that was emailed to you. If you believe this is an error, contact
          <a href="mailto:sponsors@thepathway.email">sponsors@thepathway.email</a>.
        </p>
        <p style="margin:0; opacity:0.75; line-height:1.5;">
          Tip: the access link includes a short token like <code>?t=...</code>.
        </p>
      </div>
    </div>
  </body>
</html>`;

  return new Response(html, {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      ...noindexHeaders(),
    },
  });
}

async function verifyToken(token: string, secret: string): Promise<{ ok: true; exp?: number } | { ok: false }> {
  // Token format: base64url(payloadJson).base64url(hmacSha256(payload))
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false };
  const [payloadB64, sigB64] = parts;

  let payloadBytes: Uint8Array;
  let sigBytes: Uint8Array;
  try {
    payloadBytes = base64UrlToBytes(payloadB64);
    sigBytes = base64UrlToBytes(sigB64);
  } catch {
    return { ok: false };
  }

  const expected = await hmacSha256(secret, payloadBytes);
  if (!timingSafeEqual(sigBytes, expected)) return { ok: false };

  let payload: any;
  try {
    payload = JSON.parse(new TextDecoder().decode(payloadBytes));
  } catch {
    return { ok: false };
  }

  const exp = typeof payload?.exp === "number" ? payload.exp : undefined;
  if (typeof exp === "number" && Date.now() > exp) return { ok: false };

  return { ok: true, exp };
}

function setAccessCookie(headers: Headers, maxAgeSeconds: number) {
  // Note: Edge Functions support adding Set-Cookie via Headers.
  headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=1; Path=/; Max-Age=${maxAgeSeconds}; HttpOnly; Secure; SameSite=Lax`,
  );
}

export default async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  // Let Netlify handle the Edge Function bundle and internal paths.
  if (url.pathname.startsWith("/.netlify/")) return fetch(request);

  const secret = Netlify.env.get("AUTH_SECRET");
  if (!secret) {
    return new Response("Missing AUTH_SECRET.", { status: 500, headers: noindexHeaders() });
  }

  const cookie = request.headers.get("cookie") ?? "";
  const hasCookie = new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=1(?:;|$)`).test(cookie);

  const token = url.searchParams.get(TOKEN_PARAM) ?? "";

  // If already authorized, pass through (but still add noindex headers).
  if (hasCookie) {
    const res = await fetch(request);
    const headers = new Headers(res.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  }

  // If a token is present, validate it.
  if (token) {
    const verified = await verifyToken(token, secret);
    if (!verified.ok) return unauthorizedResponse();

    // Store access and redirect to the same path without the token.
    url.searchParams.delete(TOKEN_PARAM);
    const location = url.pathname + (url.search ? url.search : "") + (url.hash ? url.hash : "");

    const headers = new Headers({
      Location: location,
      ...noindexHeaders(),
    });
    // Default: 14 days. (Token may have a shorter exp, but cookie is still bounded.)
    setAccessCookie(headers, 60 * 60 * 24 * 14);

    return new Response(null, { status: 302, headers });
  }

  // If requesting an asset, don't leak it without auth.
  if (isLikelyAssetPath(url.pathname)) return unauthorizedResponse();

  // Otherwise, block the HTML/doc request.
  return unauthorizedResponse();
};

