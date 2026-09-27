# InkTec Web App

Responsive Next.js storefront using the App Router and static export. It imports product names, pricing, specifications, descriptions, and gallery images from the existing HTML product pages so the original site can remain available during migration.

## Run locally

From this directory:

```sh
npm install
npm run dev
```

Next.js serves the app at `http://localhost:3000/` by default. The development and build scripts run the legacy product importer before starting or compiling.

## Build

```sh
npm run build
npm run preview
```

The deployable static site is generated in `out/`. Product routes are pre-rendered, so the export can be hosted on a static web host without a Node.js server.

## Product data

The importer reads the root-level product HTML files and writes generated data to `src/data/products.json`, copying referenced gallery images to `public/assets/`. Those generated files are refreshed on each dev start and production build; edit the original product pages to update their content.

