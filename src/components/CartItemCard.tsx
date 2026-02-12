'use client';

import Image from 'next/image';
import { CartItem, useCartStore } from '@/stores/cartStore';

interface CartItemCardProps {
    item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
    const { removeItem, updateQuantity } = useCartStore();

    return (
        <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
            <div className="shrink-0">
                <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-primary leading-tight mb-1 font-display">
                            {item.title}
                        </h3>
                        {item.variant && (
                            <p className="text-sm text-text-sub">{item.variant}</p>
                        )}
                        <p className="text-sm text-green-600 font-medium mt-1 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            In Stock
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-primary">MUR {item.price.toLocaleString()}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4 sm:mt-0">
                    <div className="flex items-center gap-6">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-gray-200 rounded-lg h-9">
                            <button
                                onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 rounded-l-lg transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="w-10 h-full flex items-center justify-center text-sm font-medium text-primary">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 rounded-r-lg transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                        <button
                            onClick={() => removeItem(item.cartId)}
                            className="text-sm text-text-sub hover:text-red-600 font-medium underline-offset-4 hover:underline transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                    <p className="text-sm font-medium text-text-sub">
                        Total: <span className="text-primary font-bold">MUR {(item.price * item.quantity).toLocaleString()}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
