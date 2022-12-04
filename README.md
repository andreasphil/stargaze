<h1 align="center">
  Stargaze ✨
</h1>

<p align="center">
  <strong>A faster way of browsing and searching your starred repositories on GitHub</strong>
</p>

<p align="center">
<a href="https://fresh.deno.dev">
   <img width="197" height="37" src="https://fresh.deno.dev/fresh-badge.svg" alt="Made with Fresh" />
</a>
</p>

- 👀 View your most recently starred repositories
- ⚡️ Filter repositories by name, description, author, and language
- 🌍 Quickly access the repository or the website (coming soon!)
- 🤝 Zero tracking and only requires reading permissions to your account

## Development

The app is built on [Preact](https://preactjs.com) and
[Fresh](https://fresh.deno.dev), run by [Deno](https://deno.land) to enable
local development and testing of serverless functions. Hosting works out of the
box on [Deno Deploy](https://deno.com).

Because Stargaze relies on GitHub's GraphQL API and OAuth flow, you'll need to
[create an OAuth app](https://docs.github.com/en/developers/apps/creating-an-oauth-app)
in the developer section in your profile settings. For local development, the
following settings should work:

- Homepage URL: `http://localhost:1234`
- Authorization Callback URL: `http://localhost:1234`

Next, create a `.env` file in the root of your repository. This is where
sensitive information like the app secret will be stored:

```bash
# .env
API_CLIENT_ID=<GitHub app ID>
API_SECRET=<GitHub app secret>
```

Once all is set up, run `deno task start` to boot the dev server.

## Deployment

Deployment should work out of the box on Deno deploy once you've set the
environment variables:

```bash
API_CLIENT_ID=<GitHub app ID>
API_SECRET=<GitHub app secret>
HOSTED_ON=<app URL, default: http://localhost:8000>
```

## Credits

Apart from the open source packages listed in
[import_map.json](import_map.json), Stargaze uses:

- Icons from [Heroicons](https://heroicons.com) and
  [Feather](https://feathericons.com)
- Favicons generated with [IconKitchen](https://icon.kitchen/)

Thanks 🙏
