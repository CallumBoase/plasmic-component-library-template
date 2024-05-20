# Plasmic component library template

This is a template for creating a Plasmic component library with React, Typescript, and Vite.

## Background

This template was created using the following command:

```bash
npm create vite@latest
```

And then modified so it bundles a component library rather than an app, based on the instructions by Andreas Riedmüller [Create Component library Fast (using Vite's library mode)](https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma).

We have then further modified the template:
1. Removal of CSS imports similar to [this example repo](https://github.com/receter/my-component-library/tree/no-css-injection) from Andreas Riedmüller
2. Installation of the @plasmicapp/host package so that the components registration functions (eg `src/components/H1/registerComponentMeta.ts`) can be created with appropriate types.

## Getting started

1. Clone or fork this repo
2. Run `npm install` to install dependencies

## How to use
1. Add your own components to the `lib` folder
2. Export your components in `lib/main.ts`
3. Run `npm run build` to build the library. It will be built in the `dist` folder

## Local testing in simple React app (this repo)
The `./src` folder contains a simple React app which you can use for testing. it will not be published.

To test your components during development
1. Follow steps 1-3 in the previous sections
2. Import the components at top of `./src/App.tsx` like this
```typescript
import "../dist/assets/style.css";
import { H1, H2 } from "../";
```
3. Use the components as required in the `./src/App.tsx` file
4. Run `npm run dev` to start the dev server. You'll see your components rendered

## Testing in a Plasmic nextjs Pages router app

In this project
1. Follow steps 1-3 in the `How To use` section above
2. Run `npm pack` to package the library to .tgz (which simulates what happens when you live-publish to npm)

In your Plasmic project
1. Make sure you've already got a repo set up with Plasmic that uses your local repo as a custom app host
2. (If previously installed) Uninstall the library (`npm uninstall your-library-name`)
3. Run `npm install ./path/to/your/library-X.X.X.tgz` to install the library based on the local .tgz file
4. Create an `_app.tsx` file in `./pages/_app.tsx` and import the bundled CSS filre
  ```typescript
  import '@/styles/globals.css'
  import { PlasmicRootProvider } from "@plasmicapp/react-web";
  import type { AppProps } from "next/app";
  import Head from "next/head";

  import 'plasmic-markdown-render/dist/assets/style.css';

  export default function MyApp({ Component, pageProps }: AppProps) {
    return (
      <PlasmicRootProvider Head={Head}>
        <Component {...pageProps} />
      </PlasmicRootProvider>
    );
  }
  ```
5. Register the components for use in plasmic studio (exact method will depend on whether you're using codegen or loaer API method with Plasmic)
  ```typescript
  // If using codegen: content of pages/plasmic-host.tsx should be
  import * as React from 'react';
  import { PlasmicCanvasHost, registerComponent } from '@plasmicapp/react-web/lib/host';

  import { H1, renderH1Meta, H2, renderH2Meta } from 'plasmic-markdown-render';

  registerComponent(H1, renderH1Meta);
  registerComponent(H2, renderH2Meta);

  export default function PlasmicHost() {
    return <PlasmicCanvasHost />;
  }
  ```



## How to handle CSS

This template bundles all `.css` and `.module.css` files are imported into any component in the `lib` folder into a unified CSS file, output into the `dist` folder (`./dist/assets/style.css`).

This css file should then be imported manually by your users into their app.

Eg in a nextjs pages router app, users would import the css file in the `_app.tsx` file like this:
```typescript
import 'plasmic-markdown-render/dist/assets/style.css';
```

This is different to the approach suggested by Andreas Riedmüller in his [Create Component library Fast (using Vite's library mode)](https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma) article, because Plasmic is most commonly used with nextjs pages router, which does NOT support global CSS import in components from the node_modules folder.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
