<h1 align="center">
  Stargaze ✨
</h1>

<p align="center">
  <strong>A faster way of browsing and searching your starred repositories on GitHub</strong>
</p>

- 👀 View your most recently starred repositories
- ⚡️ Filter repositories by name, description, author, and language
- 🌍 Quickly access the repository or the website (coming soon!)
- 🤝 No login or account access needed

## Usage

Find the app at <https://stargaze.a13i.dev>.

## Development

Stargaze is a [Vue 3](https://vuejs.org) app based on the [Unbuild](https://github.com/andreasphil/unbuild) template. The setup doesn't use any build steps or package management. You'll need a HTTP server for serving the project during development, since features such as JavaScript modules are not supported by the file protocol. Any server will do. I like [`servor`](https://github.com/lukejacksonn/servor):

```sh
# --browse launches a browser, --reload reloads when files change
npx servor --browse --reload
```

## Deployment

Deployment should work out of the box on GitHub Pages.

## Credits

This app uses a number of open source packages found in [`common`](./common).

Thanks 🙏
