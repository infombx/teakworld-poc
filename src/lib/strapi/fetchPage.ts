import qs from 'qs';
import { StrapiPage, StrapiResponse, StrapiImage } from './types';
import { getPagePopulateObject, populateBlocks } from './populateBlocks';
import { dummyHomePage, dummyShopPage } from './dummyData';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Get full image URL from Strapi image object
 */
export function getImageUrl(image?: StrapiImage): string {
    if (!image?.url) return '';

    // If URL is already absolute (starts with http), return as-is
    if (image.url.startsWith('http')) {
        return image.url;
    }

    // Otherwise, prepend Strapi URL
    return `${STRAPI_URL}${image.url}`;
}

/**
 * Fetch a page by slug with all blocks populated
 */
export async function fetchPage(slug: string): Promise<StrapiPage | null> {
    try {
        const populateObject = getPagePopulateObject();
        const queryObject = {
            filters: {
                slug: {
                    $eq: slug,
                },
            },
            ...populateObject,
        };

        const queryString = qs.stringify(queryObject);

        const url = `${STRAPI_URL}/api/pages?${queryString}`;

        const res = await fetch(url, {
            next: { revalidate: 60 },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.warn(`Failed to fetch page "${slug}" from Strapi, using dummy data`);
            return getDummyPage(slug);
        }

        const response: StrapiResponse<StrapiPage> = await res.json();

        if (!response.data || response.data.length === 0) {
            console.warn(`Page "${slug}" not found in Strapi, using dummy data`);
            return getDummyPage(slug);
        }

        const page = response.data[0];

        // Process blocks if present
        if (page.blocks && Array.isArray(page.blocks)) {
            page.blocks = populateBlocks(page.blocks);
        }

        return page;
    } catch (error) {
        console.error(`Error fetching page "${slug}":`, error);
        return getDummyPage(slug);
    }
}

/**
 * Get dummy page data as fallback
 */
function getDummyPage(slug: string): StrapiPage | null {
    switch (slug) {
        case 'home':
        case '':
            return dummyHomePage.data[0];
        case 'shop':
        case 'shop-page':
            return dummyShopPage.data[0];
        default:
            // Return home page as default fallback
            return dummyHomePage.data[0];
    }
}

/**
 * Fetch all products (for cart/checkout pages)
 */
export async function fetchProducts() {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/products?populate=featuredImage,images,product_category`,
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }

        const response = await res.json();
        return response.data || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        // Return dummy products from dummyData
        const { dummyProducts } = await import('./dummyData');
        return dummyProducts;
    }
}
