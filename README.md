# Alvin Mahmud's Portfolio

My single-page portfolio, built with React, TypeScript, and Vite and deployed to GitHub Pages.

Visit [alvinmahmud.github.io](https://alvinmahmud.github.io/).

## Development

```bash
npm install
npm run dev
```

## Contact form

The Contact tab uses Formspree to forward messages to your inbox. Sending stays disabled until the endpoint is configured; visitors can still use the direct email and social links.

1. Create and verify a form at [Formspree](https://formspree.io/) with your preferred receiving email.
2. Set `contactFormEndpoint` in `src/data.ts` to the form's public HTTPS endpoint.
3. Rebuild and deploy (or use the dev server), then send a test message to verify delivery and reply-to behavior.

The endpoint is public, not a secret. Never add email credentials or private API keys. Submitted names, email addresses, optional phone numbers, and messages are processed by Formspree. Free-tier limits and spam protections are managed in your Formspree account.

### Basic spam protection

The form includes Formspree's `_gotcha` honeypot and a one-minute browser-side cooldown between submission attempts. The cooldown is stored locally to cover reloads and other tabs (with an in-memory fallback if storage is blocked). Rate-limit responses from Formspree show a dedicated message.

The cooldown only discourages repeated use of the UI; it is not a security boundary and cannot block direct requests to the public endpoint. Review and enable the spam/CAPTCHA protections available in your Formspree account for server-side enforcement. No private credentials or custom backend are needed for the frontend protections.

## Checks

```bash
npm run format:check
npm run build
```

Pushing to `main` builds the app and deploys the generated `dist/` directory through GitHub Actions.
