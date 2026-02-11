import { title } from 'process';
import { ContentBlock } from './types';

/**
 * Get the populate query string for a specific block type
 */
export function getBlockPopulate(componentName: string): string {
    switch (componentName) {
        case 'blocks.hero-banner':
            return 'blocks.backgroundImage';
        case 'blocks.brands':
            return 'blocks.brands,blocks.brands.logo';
        case 'blocks.products-grid':
            return 'blocks.products,blocks.products.featuredImage,blocks.products.product_category';
        case 'blocks.about':
            return 'blocks.image,blocks.stats';
        case 'blocks.contact':
            return '';
        default:
            return '';
    }
}

/**
 * Build the full populate query for fetching a page with all its blocks
 */
/**
 * Build the populate object for qs
 */
export function getPagePopulateObject() {
    return {
        populate: {
            blocks: {
                on: {
                    'blocks.hero-banner': {
                        populate: {
                            backgroundImage: {
                                fields: ['url', 'alternativeText']
                            },
                            cta: {
                                populate: '*'
                            }
                        }
                    },
                    'blocks.brands': {
                        populate: {
                            brands: {
                                populate: {
                                    logo: {
                                        fields: ['url', 'alternativeText']
                                    }
                                }
                            },
                            /*{
                                logo: {
                                    fields: ['url', 'alternativeText']
                                }
                            }*/

                        }
                    },/*
                    'blocks.products-grid': {
                        populate: {
                            products: {
                                populate: {
                                    featuredImage: {
                                        fields: ['url', 'alternativeText']
                                    },
                                    product_category: {
                                        fields: ['name', 'slug']
                                    }
                                }
                            }
                        }
                    },
                    'blocks.about': {
                        populate: {
                            image: {
                                fields: ['url', 'alternativeText']
                            },
                            stats: {
                                populate: '*'
                            }
                        }
                    },
                    'blocks.contact': {
                        populate: '*'
                    }*/
                }
            }
        }
    };
}

/**
 * Populate block-specific content
 * This processes fetched blocks and ensures all required data is present
 */
export function populateBlockContent<T extends ContentBlock>(block: T): T {
    switch (block.__component) {
        case 'blocks.hero-banner':
            return {
                ...block,
                text: block.text || 'Hero Title',
                subtitle: block.subtitle || 'Hero Subtitle',
                cta: block.cta || { id: 0, text: 'Shop Now', href: '/shop', isExternal: false },
            } as T;

        case 'blocks.brands':
            return {
                ...block,
                title: block.title || 'As seen in',
                brands: block.brands || [],
            } as T;

        case 'blocks.products-grid':
            return {
                ...block,
                title: block.title || 'Featured Products',
                subtitle: block.subtitle || 'New Arrivals',
                products: block.products || [],
            } as T;

        case 'blocks.about':
            return {
                ...block,
                subtitle: block.subtitle || 'Our Story',
            } as T;

        case 'blocks.contact':
            return {
                ...block,
                buttonText: block.buttonText || 'Get in Touch',
            } as T;

        default:
            return block;
    }
}

/**
 * Process all blocks on a page
 */
export function populateBlocks(blocks: ContentBlock[]): ContentBlock[] {
    return blocks.map(block => populateBlockContent(block));
}
