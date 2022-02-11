# Marina Connect button component for Svelte

## Install

```sh
npm install -S svelte-marina-button
// or with yarn
yarn add svelte-marina-button
```


## Example

Add to your svelte app

```tsx
import Connect, { marinaStore, MarinaStore } from 'svelte-marina-button';

// You can subscribe to marina status changes
marinaStore.subscribe((s: MarinaStore) => {
	console.log(s.network);
	console.log(s.installed);
});

// you can pass optional cssClass to style your button
<Connect cssClass={'special-button-css'} />;
```

## Developing

Test the library with an example page

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
yarn build
```

> You can preview the built app with `yarn preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Release

1. Increment the version and commit

```bash
npm version patch
```

2. Package the library

```bash
npm run package
```

Now you can publish to NPM registry entering the `package` folder and running `npm publish`
