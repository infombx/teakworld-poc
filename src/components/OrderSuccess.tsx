'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CartItem } from '@/stores/cartStore';

interface OrderSuccessProps {
    items: CartItem[];
    total: number;
}

export default function OrderSuccess({ items, total }: OrderSuccessProps) {
    return (
        <div className="max-w-xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-primary mb-2 font-display">Order Completed!</h1>
            <p className="text-text-sub mb-8">
                Thank you for your purchase. Your order has been placed successfully.
            </p>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <h2 className="text-lg font-bold text-primary mb-4 font-display">Order Summary</h2>
                <div className="space-y-4 mb-6">
                    {items.map((item) => (
                        <div key={item.documentId} className="flex gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-500 text-white text-xs font-bold flex items-center justify-center">
                                    {item.quantity}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-primary">{item.title}</h3>
                                {item.variant && (
                                    <p className="text-xs text-text-sub">{item.variant}</p>
                                )}
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold text-primary">
                                    ${(item.price * item.quantity).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">Total</span>
                        <span className="text-2xl font-bold text-primary">${total.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Guarantee */}
            <div className="bg-accent/5 rounded-xl p-4 mb-8 flex gap-3 items-start text-left border border-accent/10">
                <svg className="w-6 h-6 text-accent mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                    <h4 className="text-sm font-bold text-primary">Teakworld Guarantee</h4>
                    <p className="text-xs text-text-sub mt-1">
                        Every piece is handcrafted and inspected before shipping. Includes 5-year structural warranty.
                    </p>
                </div>
            </div>

            {/* Back to Home */}
            <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
            </Link>
        </div>
    );
}
