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
            children:[{
                text: 'Handcrafted solid teak dining table',
            }]
        }],
        price: 2499,
        PercentageDiscount: 0,
        colour: 'Natural',
        featuredImage: {
            id: 1,
            documentId: 'img-001',
            url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
        },
        product_category: { id: 1, documentId: 'cat-001', name: 'Dining', slug: 'dining' },
    },
    {
        id: 2,
        documentId: 'prod-002',
        title: 'Teak Lounge Chair',
        description: [{
            children:[{
                text: 'Modern teak lounge chair with cushion',
            }]
        }],
        price: 899,
        PercentageDiscount: 15,
        colour: 'Honey',
        featuredImage: {
            id: 2,
            documentId: 'img-002',
            url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
        },
        product_category: { id: 2, documentId: 'cat-002', name: 'Seating', slug: 'seating' },
    },
    {
        id: 3,
        documentId: 'prod-003',
        title: 'Teak Coffee Table',
        description: [{
            children:[{
                text: 'Minimalist teak coffee table',
            }]
        }],
        price: 749,
        PercentageDiscount: 0,
        colour: 'Dark Walnut',
        featuredImage: {
            id: 3,
            documentId: 'img-003',
            url: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80',
        },
        product_category: { id: 3, documentId: 'cat-003', name: 'Tables', slug: 'tables' },
    },
    {
        id: 4,
        documentId: 'prod-004',
        title: 'Teak Outdoor Bench',
        description: [{
            children:[{
                text: 'Weather-resistant outdoor bench',
            }]
        }],
        price: 1299,
        PercentageDiscount: 10,
        colour: 'Natural',
        featuredImage: {
            id: 4,
            documentId: 'img-004',
            url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80',
        },
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
        //@ts-ignore
        { id: 1, documentId: 'brand-001', name: 'Simple Life', logo: { id: 1, documentId: 'bl-1', url: '/brands/simple-life-logo-2.svg', alternativeText: 'null' } },
        //@ts-ignore
        { id: 2, documentId: 'brand-002', name: 'Rug Culture', logo: { id: 2, documentId: 'bl-2', url: '/brands/rug-culture-logo-2.svg', alternativeText: 'null' } },
        //@ts-ignore
        { id: 3, documentId: 'brand-003', name: 'iSleep', logo: { id: 3, documentId: 'bl-3', url: '/brands/isleep-logo-svg.svg', alternativeText: 'null' } },
        //@ts-ignore
        { id: 4, documentId: 'brand-004', name: 'Amercook', logo: { id: 4, documentId: 'bl-4', url: '/brands/amercook-logo-2.svg', alternativeText: 'null' } },
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
