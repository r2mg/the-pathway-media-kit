
  # Update color and font

  This is a code bundle for Update color and font. The original project is available at https://www.figma.com/design/jrxMSephUZSbINLJFWIDFP/Update-color-and-font.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Private access (Netlify magic links)

This project is configured to be deployed on Netlify with an Edge Function that restricts access.

- Set a Netlify environment variable `AUTH_SECRET` to a long random string.
- Generate a link locally (same secret) and email it to the recipient:

```bash
AUTH_SECRET="your-secret" BASE_URL="https://your-site.netlify.app" npm run auth:link
```

Visiting the generated URL sets an access cookie and redirects to the clean URL (without `?t=`).
  