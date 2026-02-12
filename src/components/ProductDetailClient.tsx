'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { Product, getImageUrl } from '@/lib/strapi';

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(product.colour?.[0]?.name || '');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading check or just ensuring hydration
        if (product) {
            setIsLoading(false);
        }
    }, [product]);

    // Get store actions and state
    const { addItem, updateQuantity, getItemQuantity, openSidebar } = useCartStore();

    // Get current quantity from store for this specific variant
    const cartQuantity = getItemQuantity(product.documentId, selectedColor || product.product_category?.name);

    const addItemToCart = () => {
        const imageUrl = product.featuredImage
            ? getImageUrl(product.featuredImage)
            : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80';

        addItem({
            documentId: product.documentId,
            title: product.title,
            price: discountedPrice || product.price,
            image: imageUrl,
            variant: selectedColor || product.product_category?.name,
            quantity: 1,
        });
        openSidebar();
    };

    const updateCartQuantity = (newQty: number) => {
        const variant = selectedColor || product.product_category?.name;
        const cartId = `${product.documentId}-${variant || 'default'}`;
        updateQuantity(cartId, newQty);
    };

    const images = product.images && product.images.length > 0 ? product.images : (product.featuredImage ? [product.featuredImage] : []);
    const currentImage = images[selectedImageIndex];

    const discountedPrice = product.percentageDiscount > 0
        ? product.price * (1 - product.percentageDiscount / 100)
        : null;

    const description = product.description?.[0]?.children?.[0]?.text || 'No description available';

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-gray-100 font-display pb-24 lg:pb-0">
            <main className="pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 pb-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative group w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-[20px] bg-gray-200 dark:bg-surface shadow-xl border border-white/5">
                            {currentImage && (
                                <Image
                                    src={getImageUrl(currentImage)}
                                    alt={product.title}
                                    fill
                                    className="object-cover object-center transform transition duration-700 group-hover:scale-105"
                                />
                            )}
                            {product.percentageDiscount > 0 && (
                                <div className="absolute top-4 left-4 bg-accent text-white font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
                                    -{product.percentageDiscount}% OFF
                                </div>
                            )}
                            <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {images.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full shadow-sm transition-all ${index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="hidden sm:grid grid-cols-4 gap-4 mt-4">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`relative aspect-square rounded-xl overflow-hidden transition-all ${index === selectedImageIndex
                                        ? 'ring-2 ring-accent ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark'
                                        : 'opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <Image
                                        src={getImageUrl(img)}
                                        alt={`${product.title} view ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-8 lg:mt-0 flex flex-col h-full">
                        <div className="mb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-white leading-tight mb-4">
                                        {product.title}
                                    </h1>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-accent">
                                MUR {discountedPrice ? discountedPrice.toLocaleString() : product.price.toLocaleString()}
                                {discountedPrice && (
                                    <span className="text-lg font-normal text-gray-500 dark:text-gray-500 line-through ml-2">
                                        MUR {product.price.toLocaleString()}
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="w-full h-px bg-gray-200 dark:bg-white/10 mb-8" />
                        <div className="space-y-8 flex-grow">
                            {/* Color Selector */}
                            {product.colour && product.colour.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-3 uppercase tracking-wide">
                                        Finish
                                    </h3>
                                    {isLoading ? (
                                        <div className="flex gap-3">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            {product.colour.map((color, index) => {
                                                const colorMap: Record<string, string> = {
                                                    // Wood Tones
                                                    'Natural Teak': '#8B5A2B', 'Teak': '#8B5A2B',
                                                    'Dark Walnut': '#4A3728', 'Walnut': '#4A3728',
                                                    'Light Oak': '#D7C4A8', 'Oak': '#D7C4A8',
                                                    'Mahogany': '#C04000', 'Cherry': '#D2691E', 'Ash': '#B2BEB5',
                                                    'Beech': '#F5F5DC', 'Maple': '#C19A6B', 'Pine': '#D5B85A',

                                                    // Basic Colors
                                                    'White': '#FFFFFF', 'Black': '#000000', 'Grey': '#808080',
                                                    'Red': '#FF0000', 'Blue': '#0000FF', 'Green': '#008000',
                                                    'Yellow': '#FFFF00', 'Orange': '#FFA500', 'Purple': '#800080',
                                                    'Pink': '#FFC0CB', 'Brown': '#A52A2A', 'Beige': '#F5F5DC',
                                                    'Cream': '#FFFDD0', 'Ivory': '#FFFFF0', 'Khaki': '#F0E68C',
                                                    'Silver': '#C0C0C0', 'Gold': '#FFD700', 'Bronze': '#CD7F32',
                                                    'Navy': '#000080', 'Teal': '#008080', 'Olive': '#808000',
                                                    'Maroon': '#800000', 'Lime': '#00FF00', 'Aqua': '#00FFFF',
                                                    'Sky Blue': '#87CEEB', 'Indigo': '#4B0082', 'Violet': '#EE82EE',
                                                    'Magenta': '#FF00FF', 'Dark Green': '#006400', 'Light Blue': '#ADD8E6',
                                                    'Tan': '#D2B48C', 'Sand': '#C2B280', 'Charcoal': '#36454F',
                                                    'Slate': '#708090', 'Lavender': '#E6E6FA', 'Coral': '#FF7F50',
                                                    'Salmon': '#FA8072', 'Turquoise': '#40E0D0', 'Mint': '#98FF98',
                                                    'Peach': '#FFDAB9', 'Apricot': '#FBCEB1', 'Rose': '#FF007F',
                                                    'Plum': '#DDA0DD', 'Lilac': '#C8A2C8', 'Periwinkle': '#CCCCFF',
                                                    'Burgundy': '#800020', 'Ochre': '#CC7722', 'Sienna': '#A0522D',
                                                    'Terracotta': '#E2725B', 'Rust': '#B7410E', 'Copper': '#B87333',
                                                    'Brass': '#B5A642', 'Champagne': '#F7E7CE', 'Pearl': '#EAE0C8',
                                                    'Emerald': '#50C878', 'Sapphire': '#0F52BA', 'Ruby': '#E0115F',

                                                    // Fallbacks
                                                    'Natural': '#8B5A2B', 'Dark': '#000000', 'Light': '#FFFFFF',
                                                };
                                                const bgStyle = colorMap[color.name] || color.name;

                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => setSelectedColor(color.name)}
                                                        aria-label={color.name}
                                                        style={{ backgroundColor: bgStyle.startsWith('#') ? bgStyle : undefined }}
                                                        className={`w-12 h-12 rounded-full shadow-sm transition-all ${!bgStyle.startsWith('#') ? 'bg-gray-200' : ''} ${selectedColor === color.name
                                                            ? 'ring-2 ring-offset-2 ring-accent ring-offset-background-light dark:ring-offset-background-dark'
                                                            : 'ring-1 ring-white/10 hover:ring-2 hover:ring-offset-2 hover:ring-accent hover:ring-offset-background-light dark:hover:ring-offset-background-dark'
                                                            }`}
                                                    />
                                                );
                                            })}

                                        </div>
                                    )}
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Selected: <span className="font-medium text-gray-900 dark:text-gray-200">{selectedColor}</span>
                                    </p>
                                </div>
                            )}

                            {/* Collapsible Sections */}
                            <div className="space-y-4">
                                <details className="group border-b border-gray-200 dark:border-white/10 pb-4" open>
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-900 dark:text-gray-100">
                                        <span>Description</span>
                                        <span className="transition group-open:rotate-180">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="text-gray-600 dark:text-gray-400 mt-3 group-open:animate-fadeIn leading-relaxed text-sm">
                                        {description}
                                    </div>
                                </details>
                                <details className="group border-b border-gray-200 dark:border-white/10 pb-4">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-gray-900 dark:text-gray-100">
                                        <span>Dimensions & Specs</span>
                                        <span className="transition group-open:rotate-180">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="text-gray-600 dark:text-gray-400 mt-3 group-open:animate-fadeIn text-sm">
                                        <ul className="space-y-1">
                                            {product.measurement && (
                                                <li className="flex justify-between">
                                                    <span>Dimensions</span> <span>{product.measurement}</span>
                                                </li>
                                            )}
                                            {product.SKU && (
                                                <li className="flex justify-between">
                                                    <span>SKU</span> <span>{product.SKU}</span>
                                                </li>
                                            )}
                                            {product.stock !== undefined && (
                                                <li className="flex justify-between">
                                                    <span>Stock</span> <span>{product.stock} units</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </details>
                            </div>
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex gap-4 pt-8 mt-auto">
                            <div className="flex items-center border border-gray-300 dark:border-white/10 rounded-lg h-14 bg-white dark:bg-surface">
                                <button
                                    onClick={() => {
                                        if (cartQuantity === 1) {
                                            updateQuantity(`${product.documentId}-${selectedColor || product.product_category?.name || 'default'}`, 0);
                                            openSidebar();
                                        } else if (cartQuantity > 1) {
                                            updateCartQuantity(cartQuantity - 1);
                                        }
                                    }}
                                    className={`w-12 h-full flex items-center justify-center transition ${cartQuantity === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white'}`}
                                    disabled={cartQuantity === 0}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                </button>
                                <input
                                    type="text"
                                    value={cartQuantity}
                                    readOnly

                                    className="w-12 h-full bg-transparent text-center text-lg font-semibold border-none focus:ring-0 p-0 text-gray-500"
                                />
                                <button
                                    onClick={() => {
                                        if (cartQuantity === 0) {
                                            addItemToCart();
                                        } else {
                                            updateCartQuantity(cartQuantity + 1);
                                        }
                                    }}
                                    className="w-12 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                            <button
                                onClick={cartQuantity > 0 ? openSidebar : addItemToCart}
                                className="flex-1 bg-accent hover:opacity-90 text-white text-lg font-bold h-14 rounded-lg shadow-lg shadow-accent/20 flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px]"
                            >
                                <span>{cartQuantity > 0 ? 'In Cart' : 'Add to Cart'}</span>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </button>
                            <button className="h-14 w-14 rounded-lg border border-gray-300 dark:border-white/10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-primary border-t border-gray-200 dark:border-white/5 z-40 lg:hidden">
                <div className="flex gap-4 items-center max-w-7xl mx-auto">
                    <div className="flex items-center border border-gray-300 dark:border-white/10 rounded-lg h-12">
                        <button
                            onClick={() => {
                                if (cartQuantity === 1) {
                                    updateQuantity(`${product.documentId}-${selectedColor || product.product_category?.name || 'default'}`, 0);
                                    openSidebar();
                                } else if (cartQuantity > 1) {
                                    updateCartQuantity(cartQuantity - 1);
                                }
                            }}
                            className={`w-10 h-full flex items-center justify-center transition ${cartQuantity === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white'}`}
                            disabled={cartQuantity === 0}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            value={cartQuantity}
                            readOnly
                            className="w-8 h-full bg-transparent text-center text-sm font-semibold border-none focus:ring-0 p-0 text-primary dark:text-white"
                        />
                        <button
                            onClick={() => {
                                if (cartQuantity === 0) {
                                    addItemToCart();
                                } else {
                                    updateCartQuantity(cartQuantity + 1);
                                }
                            }}
                            className="w-10 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                    <button
                        onClick={cartQuantity > 0 ? openSidebar : addItemToCart}
                        className="flex-1 bg-accent hover:opacity-90 text-white font-bold h-12 rounded-lg shadow-lg shadow-accent/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                        <span>{cartQuantity > 0 ? 'In Cart' : 'Add to Cart'}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
