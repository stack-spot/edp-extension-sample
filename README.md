# Sample for a Stackspot extension (EDP portal)
This project is an example and a quick starter for an extension of the EDP portal.

## Pre-installation
1. Make sure you have Node >= 18 installed. To check this, type `node -v` in a terminal window. If you don't have it, follow the instructions
[here](https://nodejs.org/en).
2. Make sure you have PNPM >= 9 installed. To check this, type `pnpm -v` in a terminal window. If you don't have it, in a terminal window type:
```sh
corepack enable
corepack prepare pnpm@latest --activate
```

If the commands above don't work, please follow the instructions [here](https://pnpm.io/installation)

## Installation
In a terminal window, in the root directory, run:
```sh
pnpm i
```

## Running
```sh
pnpm start
```

Important: although your extension is run in development mode by default, the EDP login and APIs are always run in production mode.

## Building
```sh
pnpm build
```

The output is generated under `packages/edp-extension/dist`.

## Documentation
Please, read the [SDK documentation](https://www.npmjs.com/package/@stack-spot/portal-extension) before starting an extension project.

## About the example

The example is comprised of two projects:

- edp-extension: this is the code for the extension, you should change it and implement your features here.
- edp-simulation: **you should not alter this project**, it's here as a small replica of the Stackspot portal and it allows you to run the
extension under the EDP portal environment without needing to run the whole EDP portal separately.

The example is a simple 2-page application with a catalog of products and their details. It also presents examples of how to open modal
content, toasters and how to perform network requests to the Stackspot APIs.

### Libs used by the example:

- react: the main frontend development lib (mandatory).
- portal-extension: the SDK for building the extension (mandatory).
- citric: the Stackspot's design system (mandatory).
- portal-theme: the theme for Citric (mandatory).
- portal-translate: internationalization (optional).
- portal-components: additional collection of components based on Citric (optional).
- citron-navigator: a react navigator (optional).
- react-query: state management for network requests (optional, a dependency of portal-extension).
- styled-components: a javascript-like css processor for React (optional, a dependency of most of stackspot libraries).
- vite: build manager, bundler (optional, you could replace with another bundler).
- lodash: collection of utility functions (optional).

The libraries that are optional, are recommended, please prefer using them over alternatives.

### Navigation
Citron navigator is our preferred navigation library. To create new routes or alter the existing ones, please modify the files:

- packages/edp-extension/navigation.yaml
- packages/edp-extension/src/views/hook.tsx

Whenever `navigation.yaml` is changed, the navigation files must be regenerated. To regenerate the navigation files you may run under
`packages/edp-extension`:

- `pnpm citron` or;
- `pnpm start` or;
- `pnpm i`.

The navigation file structure and how to use the library is documented in the readme file of the
[lib's repository](https://github.com/stack-spot/citron-navigator).

If your extension starts to become a large application, we recommend loading pages asynchronously. Async loading views is not used by this
example, but is explained [here](https://github.com/stack-spot/citron-navigator/blob/main/docs/async-route-rendering.md).

### Accessing Stackspot APIs
We don't provide the Stackspot's access token to the extension, so, in order to request data from the Stackspot API, you must use the SDK,
which will in turn make the request for you.

Here's a documentation extracted from the jsdocs of the source code:
[network documentation](https://tiagoperes.github.io/stackspot-extension-sample/).

As a consumer of `portal-extension`, you can access every client under "client" in the documentation menu.

Attention: we don't yet have a way of accessing the Stackspot APIs while running this project in localhost. This is going to be addressed
asap.
