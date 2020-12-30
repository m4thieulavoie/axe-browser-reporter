# axe-browser-reporter

Axe reporter injected in the browser page if it detects any accessibility issue.

This project is made to make the accessibility development a top priority. As soon as an a11y rule is broken, the popup will simply appear and let you know how you can fix it. We strongly rely on [axe-core](https://github.com/dequelabs/axe-core)

## Installation

```bash
npm i axe-browser-reporter
```

## Usage

> In order for the plugin to kick in, make sure that your global environment variable `process.env.NODE_ENV` does _not_ equal `production`. Otherwise, `axe-browser-reporter` won't run at all.

In your project, import `axe-browser-reporter` at the root of your project (e.g. an `index.(js|ts)` file).

```ts
import bootstrap from "axe-browser-reporter";
// Any setup code at root level of your app
bootstrap();
```

### Set options

TBD

## Roadmap

- Unit tests
- Code cleaning
