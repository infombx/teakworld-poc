// Strapi Block-Based Content Types

export interface StrapiImage {
    id: number;
    documentId: string;
    url: string;
    alternativeText?: string;
    formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
    };
}

export interface Product {
    id: number;
    documentId: string;
    title: string;
    description?: string;
    price: number;
    PercentageDiscount: number;
    colour?: string;
    featuredImage?: StrapiImage;
    images?: StrapiImage[];
    product_category?: ProductCategory;
}

export interface ProductCategory {
    id: number;
    documentId: string;
    name: string;
    slug: string;
}

export interface Brand {
    id: number;
    documentId: string;
    name: string;
    logo?: StrapiImage;
}

// Block Types
export interface HeroBannerBlock {
    __component: 'blocks.hero-banner';
    id: number;
    text: string;
    subtitle?: string;
    image?: StrapiImage;
    ctaText?: string;
    ctaLink?: string;
}

export interface BrandsBlock {
    __component: 'blocks.brands';
    id: number;
    title?: string;
    brands?: Brand[];
}

export interface ProductsGridBlock {
    __component: 'blocks.products-grid';
    id: number;
    title?: string;
    subtitle?: string;
    products?: Product[];
}

export interface AboutBlock {
    __component: 'blocks.about';
    id: number;
    title: string;
    subtitle?: string;
    content: string;
    image?: StrapiImage;
    stats?: { label: string; value: string }[];
}

export interface ContactBlock {
    __component: 'blocks.contact';
    id: number;
    title: string;
    subtitle?: string;
    buttonText?: string;
}

export type ContentBlock =
    | HeroBannerBlock
    | BrandsBlock
    | ProductsGridBlock
    | AboutBlock
    | ContactBlock;

// Page Response
export interface StrapiPage {
    id: number;
    documentId: string;
    title: string;
    description?: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blocks: ContentBlock[];
}

export interface StrapiResponse<T> {
    data: T[];
    meta?: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}
