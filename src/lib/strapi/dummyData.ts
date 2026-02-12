import {
    StrapiPage,
    StrapiResponse,
    HeroBannerBlock,
    BrandsBlock,
    ProductsGridBlock,
    AboutBlock,
    ContactBlock,
    Product
} from './types';

// Dummy products for fallback
const dummyProducts: Product[] = [
    {
        id: 1,
        documentId: 'prod-001',
        title: 'Teak Dining Table',
        description: [{
            type: 'paragraph',
            children: [{
                type: 'text',
                text: 'Handcrafted solid teak dining table with natural finish. Perfect for family gatherings and elegant dining experiences.',
            }]
        }],
        price: 2499,
        percentageDiscount: 0,
        measurement: '180 x 90 x 75 cm',
        stock: 12,
        SKU: 'TBL-001',
        colour: [{ name: 'Natural' }, { name: 'Dark Walnut' }],
        featuredImage: {
            id: 1,
            documentId: 'img-001',
            url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
        },
        images: [
            { id: 1, documentId: 'img-001', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80' },
            { id: 11, documentId: 'img-001b', url: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&q=80' },
        ],
        product_category: { id: 1, documentId: 'cat-001', name: 'Dining', slug: 'dining' },
    },
    {
        id: 2,
        documentId: 'prod-002',
        title: 'Teak Lounge Chair',
        description: [{
            type: 'paragraph',
            children: [{
                type: 'text',
                text: 'Modern teak lounge chair with cushion. Ergonomic design meets timeless aesthetics.',
            }]
        }],
        price: 899,
        percentageDiscount: 15,
        measurement: '70 x 80 x 85 cm',
        stock: 25,
        SKU: 'CHR-002',
        colour: [{ name: 'Honey' }, { name: 'Natural' }],
        featuredImage: {
            id: 2,
            documentId: 'img-002',
            url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
        },
        images: [
            { id: 2, documentId: 'img-002', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
        ],
        product_category: { id: 2, documentId: 'cat-002', name: 'Seating', slug: 'seating' },
    },
    {
        id: 3,
        documentId: 'prod-003',
        title: 'Teak Coffee Table',
        description: [{
            type: 'paragraph',
            children: [{
                type: 'text',
                text: 'Minimalist teak coffee table with clean lines and functional design.',
            }]
        }],
        price: 749,
        percentageDiscount: 0,
        measurement: '120 x 60 x 45 cm',
        stock: 18,
        SKU: 'TBL-003',
        colour: [{ name: 'Dark Walnut' }],
        featuredImage: {
            id: 3,
            documentId: 'img-003',
            url: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80',
        },
        images: [
            { id: 3, documentId: 'img-003', url: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80' },
        ],
        product_category: { id: 3, documentId: 'cat-003', name: 'Tables', slug: 'tables' },
    },
    {
        id: 4,
        documentId: 'prod-004',
        title: 'Teak Outdoor Bench',
        description: [{
            type: 'paragraph',
            children: [{
                type: 'text',
                text: 'Weather-resistant outdoor bench crafted from premium teak wood.',
            }]
        }],
        price: 1299,
        percentageDiscount: 10,
        measurement: '150 x 50 x 85 cm',
        stock: 8,
        SKU: 'BNC-004',
        colour: [{ name: 'Natural' }],
        featuredImage: {
            id: 4,
            documentId: 'img-004',
            url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80',
        },
        images: [
            { id: 4, documentId: 'img-004', url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80' },
        ],
        product_category: { id: 4, documentId: 'cat-004', name: 'Outdoor', slug: 'outdoor' },
    },
];

// Dummy blocks for home page
const dummyHeroBlock: HeroBannerBlock = {
    __component: 'blocks.hero-banner',
    id: 1,
    text: 'Handcrafted Teak Furniture',
    subtitle: 'Sustainable luxury for your home. Meticulously designed for timeless elegance and durability.',
    cta: {
        id: 1,
        text: 'Shop Now',
        href: '#products',
        isExternal: false,
        icon: {
            id: 1,
            documentId: 'test',
            url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1920&q=80',
            alternativeText: 'null'
        }
    },
    backgroundImage: {
        id: 1,
        documentId: 'hero-img',
        url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1920&q=80',
    },
};

const dummyBrandsBlock: BrandsBlock = {
    __component: 'blocks.brands',
    id: 2,
    title: 'As seen in',
    brands: [
        { id: 1, documentId: 'brand-001', name: 'Simple Life', logo: { id: 1, documentId: 'bl-1', url: '/brands/simple-life-logo-2.svg', alternativeText: 'Simple Life' } },
        { id: 2, documentId: 'brand-002', name: 'Rug Culture', logo: { id: 2, documentId: 'bl-2', url: '/brands/rug-culture-logo-2.svg', alternativeText: 'Rug Culture' } },
        { id: 3, documentId: 'brand-003', name: 'iSleep', logo: { id: 3, documentId: 'bl-3', url: '/brands/isleep-logo-svg.svg', alternativeText: 'iSleep' } },
        { id: 4, documentId: 'brand-004', name: 'Amercook', logo: { id: 4, documentId: 'bl-4', url: '/brands/amercook-logo-2.svg', alternativeText: 'Amercook' } },
    ],
};

const dummyProductsBlock: ProductsGridBlock = {
    __component: 'blocks.products-grid',
    id: 3,
    title: 'Featured Products',
    subtitle: 'New Arrivals',
    products: dummyProducts,
};

const dummyAboutBlock: AboutBlock = {
    __component: 'blocks.about',
    id: 4,
    title: 'Generations of Craftsmanship',
    subtitle: 'Our Story',

    content: [
        {
            children: [
                {
                    text: 'At Teakworld, we believe that furniture should be more than just functional—it should be a legacy. Sourced from sustainable plantations and handcrafted by master artisans, each piece tells a story of tradition, durability, and natural beauty.',
                }
            ]
        }
    ],
    image: {
        id: 5,
        documentId: 'about-img',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
    stats: [
        { label: 'Years of Excellence', value: '50+' },
    ],
};

const dummyContactBlock: ContactBlock = {
    __component: 'blocks.contact-form',
    id: 5,
    title: 'Have a custom project in mind?',
    subtitle: 'We specialize in bespoke furniture pieces tailored to your exact specifications. Let\'s create something unique together.',
    buttonText: 'Get in Touch',
};

// Dummy page data
export const dummyHomePage: StrapiResponse<StrapiPage> = {
    data: [
        {
            id: 1,
            documentId: 'home-page',
            title: 'Home',
            description: 'Teakworld home page',
            slug: 'home',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
            blocks: [
                dummyHeroBlock,
                dummyBrandsBlock,
                dummyProductsBlock,
                dummyAboutBlock,
                dummyContactBlock,
            ],
        },
    ],
};

export const dummyShopPage: StrapiResponse<StrapiPage> = {
    data: [
        {
            id: 2,
            documentId: 'shop-page',
            title: 'Shop Page',
            description: 'List of products',
            slug: 'shop-page',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
            blocks: [
                {
                    __component: 'blocks.hero-banner',
                    id: 2,
                    text: 'Shop Page',
                    subtitle: "Let's design the place you always imagined.",
                },
                dummyProductsBlock,
            ],
        },
    ],
};

export { dummyProducts };
