# Strapi Schemas

This directory contains the JSON schema definitions for the Content Types and Components used in the frontend.

## Installation Instructions

Since the standard Strapi Content-Type Builder API was not accessible, these schemas must be applied manually.

### 1. Locate your Strapi Project

Find the root directory of your Strapi backend project (e.g., `my-strapi-project`).

### 2. Copy Component Schemas

Copy the `docs/strapi-schemas/components` directory to your Strapi project's `src` directory.

- **Source:** `.../teakworld-poc/docs/strapi-schemas/components`
- **Destination:** `.../my-strapi-project/src/components`

**Note:** If `src/components` already exists, merge the folders.

### 3. Copy Content Type Schemas

You will need to create the folders for each content type in your Strapi project's `src/api` directory if they don't exist.

**Structure:** `src/api/[name]/content-types/[name]/schema.json`

- **Page:**
    - Create folder: `src/api/page/content-types/page`
    - Copy `content-types/page.json` to `src/api/page/content-types/page/schema.json`

- **Product:**
    - Create folder: `src/api/product/content-types/product`
    - Copy `content-types/product.json` to `src/api/product/content-types/product/schema.json`

- **Product Category:**
    - Create folder: `src/api/product-category/content-types/product-category`
    - Copy `content-types/product-category.json` to `src/api/product-category/content-types/product-category/schema.json`

- **Brand:**
    - Create folder: `src/api/brand/content-types/brand`
    - Copy `content-types/brand.json` to `src/api/brand/content-types/brand/schema.json`

### 4. Restart Strapi

Stop your Strapi server and run `npm run develop` to apply the changes. Strapi will automatically register the new schemas.
