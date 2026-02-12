import { Product, StrapiResponse } from './types';
import { dummyProducts } from './dummyData';
import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Proper populate structure for products
const PRODUCT_POPULATE = {
    populate: {
        featuredImage: {
            fields: ['url', 'alternativeText']
        },
        images: {
            fields: ['url', 'alternativeText']
        },
        colour: {
            fields: ['name']
        },
        product_category: {
            fields: ['name', 'slug']
        }
    }
};

/**
 * Fetch a single product by documentId
 */
export async function fetchProduct(documentId: string): Promise<Product | null> {
    try {
        const queryString = qs.stringify(PRODUCT_POPULATE);

        const url = `${STRAPI_URL}/api/products/${documentId}?${queryString}`;
        const response = await fetch(url, {
            next: { revalidate: 60 }, // Revalidate every 60 seconds
        });

        if (!response.ok) {
            console.warn(`Failed to fetch product ${documentId}, using dummy data`);
            return dummyProducts.find(p => p.documentId === documentId) || null;
        }

        const data: { data: Product } = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        // Fallback to dummy data
        return dummyProducts.find(p => p.documentId === documentId) || null;
    }
}

/**
 * Fetch all products (for generating static params)
 */
export async function fetchAllProducts(): Promise<Product[]> {
    try {
        const queryString = qs.stringify(PRODUCT_POPULATE);

        const url = `${STRAPI_URL}/api/products?${queryString}`;
        const response = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            console.warn('Failed to fetch products, using dummy data');
            return dummyProducts;
        }

        const data: StrapiResponse<Product> = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return dummyProducts;
    }
}
