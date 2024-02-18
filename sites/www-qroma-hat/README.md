# Website

This website and its supporting projects are built using [qroma.dev](https://qroma.dev/), a Ruby on Rails-like embedded firmware development experience.

### Installation

```
$ qroma site build
```

### Local Development

```
$ qroma site run
```

This command starts a local development server and opens up a browser window for the site content of this project. Most site changes are reflected live without having to restart the server.

### Build

```
$ qroma site build
```

This command compiles Protocol Buffers and firmware and generates static content into the `build` directory. This content can be served using any static contents hosting service.

### Deployment

This project (via Docusaurus configuration) can use GitHub pages for hosting.