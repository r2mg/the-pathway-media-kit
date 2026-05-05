import crypto from "node:crypto";

function base64UrlEncode(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function sign(secret, payloadBytes) {
  return crypto.createHmac("sha256", secret).update(payloadBytes).digest();
}

const baseUrl = process.env.BASE_URL; // e.g. https://your-site.netlify.app
const secret = process.env.AUTH_SECRET;
const days = Number(process.env.DAYS ?? "14");

if (!baseUrl) {
  console.error("Missing BASE_URL. Example: BASE_URL=https://your-site.netlify.app");
  process.exit(1);
}
if (!secret) {
  console.error("Missing AUTH_SECRET. Use the same value in Netlify env vars.");
  process.exit(1);
}
if (!Number.isFinite(days) || days <= 0) {
  console.error("Invalid DAYS. Example: DAYS=14");
  process.exit(1);
}

const exp = Date.now() + days * 24 * 60 * 60 * 1000;
const payload = JSON.stringify({ exp });
const payloadBytes = Buffer.from(payload, "utf8");
const sig = sign(secret, payloadBytes);

const token = `${base64UrlEncode(payloadBytes)}.${base64UrlEncode(sig)}`;

const url = new URL(baseUrl);
url.searchParams.set("t", token);

console.log(url.toString());

