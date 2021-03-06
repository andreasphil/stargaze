<h1 align="center">
  Stargaze ✨
</h1>

<h4 align="center">
  A faster way of browsing and searching your starred repositories on GitHub
</h4>

<p align="center">
  <a href="https://app.netlify.com/sites/stargaze/deploys" title="Netlify Status">
    <img src="https://api.netlify.com/api/v1/badges/abd1cc77-da21-45c5-97d8-d24d5e26074b/deploy-status" alt="Netlify Status" />
  </a>
</p>

- View all your starred repositories at once
- Start typing anywhere to filter repository names, descriptions, authors, and languages
- Quickly access the repository, the website, or the author's GitHub profile
- No tracking and only requires reading permissions to your account

## Development

The app is built on [Vue 3](https://v3.vuejs.org) with [Vite](https://vitejs.dev), run by [Netlify Dev](https://www.netlify.com/products/dev/) to enable local development and testing of serverless functions.

To get started, install dependencies using `npm install`. Because Stargaze relies on GitHub's GraphQL API and OAuth flow, you'll also need to [create an OAuth app](https://docs.github.com/en/developers/apps/creating-an-oauth-app) in the developer section in your profile settings. For local development, the following settings should work:

- Homepage URL: `http://localhost:1234`
- Authorization Callback URL: `http://localhost:1234`

Next, create a `.env` file in the root of your repository. This is where sensitive information like the app secret will be stored:

```bash
# .env
VITE_APP_AUTH_CLIENT_ID=<GitHub app ID>
AUTH_CLIENT_SECRET=<GitHub app secret>
```

Once all is set up, you have the following npm scripts available to run common development tasks:

- Compile and start dev server: `npm start`
- Build for production: `npm run build`
- Lint files: `npm run lint`

## Deploy to Netlify

Deployment to Netlify is configured in the [netlify.toml file](netlify.toml) and should work out of the box. The only thing left to do is to create another GitHub app for production, and set the above environment variables in the site settings on Netlify.

## Credits

Apart from the open source packages listed in [package.json](package.json), Stargaze uses:

- Icons from [Heroicons](https://heroicons.com) and [Feather](https://feathericons.com)
- Favicons generated with [favicon.io](https://favicon.io)

Thanks 🙏
