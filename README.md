# axe-browser-reporter

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![npm version](https://badge.fury.io/js/axe-browser-reporter.svg)](https://www.npmjs.com/package/axe-browser-reporter)
[![Downloads](https://img.shields.io/npm/dm/axe-browser-reporter.svg)](https://www.npmjs.com/package/axe-browser-reporter)
[![CircleCI](https://circleci.com/gh/circleci/circleci-docs.svg?style=shield)](https://circleci.com/gh/m4thieulavoie/axe-browser-reporter)

<p align="center">
    <img src="docs/demo.gif" alt="demo" height="300" margin="auto" />
</p>

## Description

Axe reporter injected in the browser page if it detects any accessibility issue.

This project is made to make the accessibility development a top priority. As soon as an a11y rule is broken, the popup will simply appear and let you know how you can fix it. We strongly rely on [axe-core](https://github.com/dequelabs/axe-core)

## Installation

```bash
npm i axe-browser-reporter
```

## Usage

> In order for the plugin to kick in, make sure that your global environment variable `process.env.NODE_ENV` _does_ equal `'development'`. Otherwise, `axe-browser-reporter` won't run at all.

In your project, import `axe-browser-reporter` at the root of your project (e.g. an `index.(js|ts)` file).

```ts
import bootstrap from "axe-browser-reporter";
// Any setup code at root level of your app
bootstrap();
```

## Options

Some options can be passed to `bootstrap` in order to tweak `axe` under the hood

```ts
import bootstrap from "axe-browser-reporter";

// Default values
bootstrap({
  whitelist: [],
  runIf: () => process.env?.NODE_ENV === "development",
});
```

### `whitelist`

If there are rules you want `axe-browser-reporter` **not** to notify you about, you can specify them in an array of `string` like such. The argument is the `id` given from `axe`. The full list can be found [here](https://github.com/dequelabs/axe-core/blob/f318a2c958aa771493d7690b051f37b22ac1bcaf/doc/rule-descriptions.md)

```ts
import bootstrap from "axe-browser-reporter";

// Will ignore color-contrast and frame-tested a11y rules
bootstrap({
  whitelist: ["color-contrast", "frame-tested"],
});
```

### `runIf`

If you want to change the condition on wheter to run `axe-browser-reporter` or not, you can specify a `runIf` attribute. Its signature is `() => boolean`

```ts
import bootstrap from "axe-browser-reporter";

const myBoolean = randomCondition ? true : false;

bootstrap({
  runIf: () => myBoolean,
});
```
