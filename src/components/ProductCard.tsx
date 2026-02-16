'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { Product, getImageUrl } from '@/lib/strapi';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation when clicking add to cart
        const imageUrl = product.featuredImage
            ? getImageUrl(product.featuredImage)
            : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80';

        addItem({
            documentId: product.documentId,
            title: product.title,
            price: product.price,
            image: imageUrl,
            variant: product.product_category?.name,
        });
    };

    const discountedPrice = product.percentageDiscount > 0
        ? product.price * (1 - product.percentageDiscount / 100)
        : null;

    const imageUrl = product.featuredImage
        ? getImageUrl(product.featuredImage)
        : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80';

    return (
        <Link href={`/products/${product.documentId}`} className="group flex flex-col gap-4 h-full">
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-gray-100">
                <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Favorite button */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => e.preventDefault()}
                        className="bg-white p-2 rounded-full shadow-md text-primary hover:text-accent transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>

                {/* Discount badge */}
                {product.percentageDiscount > 0 && (
                    <div className="absolute top-3 left-3">
                        <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                            -{product.percentageDiscount}%
                        </span>
                    </div>
                )}

                {/* Add to cart button */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1 min-h-[72px]">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-primary text-lg font-bold hover:text-accent transition-colors font-display line-clamp-1">
                        {product.title}
                    </h3>
                    <div className="text-right flex-shrink-0">
                        {discountedPrice ? (
                            <div className="flex items-center">
                                <span className="text-primary font-semibold">MUR {discountedPrice.toLocaleString()}</span>
                                <span className="text-text-sub text-sm line-through ml-2">MUR {product.price.toLocaleString()}</span>
                            </div>
                        ) : (
                            <span className="text-primary font-semibold">MUR {product.price.toLocaleString()}</span>
                        )}
                    </div>
                </div>
                {product.description && (
                    <p className="text-text-sub text-sm line-clamp-2">{product.description[0].children[0].text}</p>
                )}
            </div>
        </Link>
    );
}
