# Plasmic component library template

This is a template for creating a Plasmic component library with React. It uses Typescript, and Vite to assist with building the library for distribution.

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
2. Go to `package.json` and set "name" to whatever you want to call your component library
3. Run `npm install` to install dependencies

## How to use
1. Add your own components to the `lib` folder instead of the example `H1` and `H2` components
2. Export your components in `lib/main.ts`
3. Run `npm run build` to build the library. It will be built in the `dist` folder

## Local testing in simple React app (this repo)
The `./src` folder contains a simple React app which you can use for testing. it is not included in the build, and will not be published if you publish your project to npm.

To test your components during development
1. Follow steps 1-3 in the previous sections
2. Import the components at top of `./src/App.tsx` like this
```typescript
import "../dist/assets/style.css";
import { H1, H2 } from "../";
```
3. Use the components as required in the `./src/App.tsx` file
4. Run `npm run dev` to start the dev server. You'll see your components rendered on the home page of your app.

## Testing in a Plasmic nextjs Pages router app

In this project
1. Follow steps 1-3 in the `How To use` section above
2. Run `npm pack` to package the library to .tgz (which simulates what happens when you live-publish to npm but just saves a local file you can npm install later)

In your Plasmic project
1. Make sure you've already got a repo set up, connected with a Plasmic app and that your Plasmic app is using your app as it's custom app host
2. (If previously installed) Uninstall the library (`npm uninstall your-library-name`)
3. Run `npm install ./path/to/your-library-name-X.X.X.tgz` to install the library based on the local .tgz file
4. If CSS is used in your component/s: create an `_app.tsx` file in `./pages/_app.tsx` and copy-paste the following code into it. Replace `your-library-name` with the name of your library
  ```typescript
  import '@/styles/globals.css'
  import { PlasmicRootProvider } from "@plasmicapp/react-web";
  import type { AppProps } from "next/app";
  import Head from "next/head";

  //Here we import the bundled CSS from the library
  import 'your-library-name/dist/assets/style.css';

  export default function MyApp({ Component, pageProps }: AppProps) {
    return (
      <PlasmicRootProvider Head={Head}>
        <Component {...pageProps} />
      </PlasmicRootProvider>
    );
  }
  ```
5. Register the components for use in plasmic studio (exact method will depend on whether you're using codegen or loader API method with Plasmic)
  ```typescript
  // If using codegen: content of pages/plasmic-host.tsx should be
  import * as React from 'react';
  import { PlasmicCanvasHost, registerComponent } from '@plasmicapp/react-web/lib/host';

  import { H1, renderH1Meta, H2, renderH2Meta } from 'your-library-name';

  registerComponent(H1, renderH1Meta);
  registerComponent(H2, renderH2Meta);

  export default function PlasmicHost() {
    return <PlasmicCanvasHost />;
  }
  ```

## How to handle CSS

This template bundles all `.css` and `.module.css` files that are imported into any component in the `lib` folder into a unified CSS file, output into the `dist` folder (`./dist/assets/style.css`).

This css file should then be imported manually by your users into their app.

Eg in a nextjs pages router app, users would import the css file in the `_app.tsx` file like this:
```typescript
import 'your-library-name/dist/assets/style.css';
```

This is different to the approach suggested by Andreas Riedmüller in his [Create Component library Fast (using Vite's library mode)](https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma) article, because Plasmic is most commonly used with nextjs pages router, which does NOT support global CSS import in components from the node_modules folder.

If you're creating a component library for nextjs APP router or some other framework that supports global CSS import from node_modules, you can follow Andreas' approach linked above.