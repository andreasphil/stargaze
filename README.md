<h1 align="center">
  Stargaze ✨
</h1>

<p align="center">
  <strong>A faster way of browsing and searching your starred repositories on GitHub</strong>
</p>

<p align="center">
<a href="https://app.netlify.com/sites/andreasphil-stargaze/deploys">
   <img src="https://api.netlify.com/api/v1/badges/2995cd1d-4c6a-422d-a6ca-d1d7ccd41119/deploy-status" alt="Netlify Status" />
</a>
</p>

- 👀 View your most recently starred repositories
- ⚡️ Filter repositories by name, description, author, and language
- 🌍 Quickly access the repository or the website (coming soon!)
- 🤝 No login or account access needed

## Development

The site is a [Vue 3](https://vuejs.org) app based on my [Unbuild](https://github.com/andreasphil/unbuild) template. The setup doesn't use any build steps or package management. You'll need a HTTP server for serving the project during development, since features such as JavaScript modules are not supported by the file protocol. Any server will do. I like [`servor`](https://github.com/lukejacksonn/servor):

```sh
# --browse launches a browser, --reload reloads when files change
npx servor --browse --reload
```

## Deployment

Deployment should work out of the box when linking the repository to a project on [Netlify](https://netlify.com).

## Credits

Stargaze uses open source packages listed in [index.html](index.html).

Thanks 🙏
