'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, CartItem } from '@/stores/cartStore';
import CartItemCard from '@/components/CartItemCard';
import CheckoutForm from '@/components/CheckoutForm';
import OrderSuccess from '@/components/OrderSuccess';

type CheckoutPhase = 'review' | 'checkout' | 'success';

export default function CartPage() {
    const { items, getSubtotal, clearCart } = useCartStore();
    const [phase, setPhase] = useState<CheckoutPhase>('review');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderedItems, setOrderedItems] = useState<CartItem[]>([]);
    const [orderTotal, setOrderTotal] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const subtotal = getSubtotal();
    const shipping = subtotal >= 2000 ? 0 : 50;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleProceedToCheckout = () => {
        setPhase('checkout');
    };

    const handlePlaceOrder = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Save order data before clearing
        setOrderedItems([...items]);
        setOrderTotal(total);

        // Clear cart and show success
        clearCart();
        setIsSubmitting(false);
        setPhase('success');
    };

    if (!mounted) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-background-light py-10">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                    {/* Phase 1: Review Cart */}
                    {phase === 'review' && (
                        <motion.div
                            key="review"
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col lg:flex-row gap-12"
                        >
                            {/* Left Column: Cart Items */}
                            <div className="flex-1 w-full lg:w-2/3">
                                <div className="flex items-baseline justify-between mb-8">
                                    <h1 className="text-3xl font-bold tracking-tight text-primary font-display">
                                        Your Shopping Cart
                                    </h1>
                                    <span className="text-text-sub font-medium">{items.length} Items</span>
                                </div>

                                {items.length === 0 ? (
                                    <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                                        <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <h2 className="text-xl font-bold text-primary mb-2 font-display">Your cart is empty</h2>
                                        <p className="text-text-sub mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
                                        <Link
                                            href="/"
                                            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold py-3 px-6 rounded-lg transition-all"
                                        >
                                            Start Shopping
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        {/* Shipping Alert */}
                                        {subtotal < 2000 && (
                                            <div className="mb-8 rounded-xl bg-accent/5 border border-accent/10 p-4 flex items-center gap-4">
                                                <div className="p-2 bg-white rounded-full shrink-0 text-accent">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-primary">Free shipping on orders over MUR 2,000</p>
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 max-w-xs">
                                                        <div
                                                            className="bg-accent h-1.5 rounded-full transition-all"
                                                            style={{ width: `${Math.min((subtotal / 2000) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-xs text-text-sub mt-1">
                                                        Add <span className="font-bold text-primary">MUR {(2000 - subtotal).toLocaleString()}</span> more to qualify.
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Cart Items */}
                                        <div className="flex flex-col gap-6">
                                            {items.map((item) => (
                                                <CartItemCard key={item.cartId} item={item} />
                                            ))}
                                        </div>

                                        {/* Continue Shopping */}
                                        <div className="mt-8">
                                            <Link
                                                href="/"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                                </svg>
                                                Continue Shopping
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Right Column: Order Summary */}
                            {items.length > 0 && (
                                <div className="w-full lg:w-1/3">
                                    <div className="sticky top-28 space-y-6">
                                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                            <h2 className="text-xl font-bold text-primary mb-6 font-display">Order Summary</h2>
                                            <div className="space-y-4 pb-6 border-b border-gray-100">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-text-sub">Subtotal</span>
                                                    <span className="font-medium text-primary">MUR {subtotal.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-text-sub">Shipping Estimate</span>
                                                    <span className="font-medium text-primary">
                                                        {shipping === 0 ? 'Free' : `MUR ${shipping.toLocaleString()}`}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-text-sub">Tax Estimate</span>
                                                    <span className="font-medium text-primary">MUR {tax.toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div className="py-6">
                                                <div className="flex justify-between items-end mb-1">
                                                    <span className="text-base font-semibold text-primary">Total</span>
                                                    <span className="text-2xl font-bold text-primary">MUR {total.toFixed(2)}</span>
                                                </div>
                                                <p className="text-xs text-text-sub text-right">MUR</p>
                                            </div>
                                            <button
                                                onClick={handleProceedToCheckout}
                                                className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                                            >
                                                Proceed to Checkout
                                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </button>
                                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-text-sub">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                Secure Checkout with 256-bit SSL
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Phase 2: Checkout Form */}
                    {phase === 'checkout' && (
                        <motion.div
                            key="checkout"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col lg:flex-row gap-12"
                        >
                            {/* Left Column: Form */}
                            <div className="flex-1 w-full lg:w-2/3 bg-white p-8 rounded-xl border border-gray-100">
                                {/* Breadcrumb */}
                                <nav className="flex items-center text-sm font-medium text-text-sub mb-8">
                                    <button
                                        onClick={() => setPhase('review')}
                                        className="hover:text-primary transition-colors"
                                    >
                                        Cart
                                    </button>
                                    <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    <span className="text-primary">Checkout</span>
                                </nav>

                                <CheckoutForm onSubmit={handlePlaceOrder} isSubmitting={isSubmitting} />
                            </div>

                            {/* Right Column: Order Summary */}
                            <div className="w-full lg:w-1/3">
                                <div className="sticky top-28 bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <h2 className="text-xl font-bold text-primary mb-6 font-display">Order Summary</h2>

                                    {/* Items */}
                                    <div className="space-y-4 mb-6">
                                        {items.map((item) => (
                                            <div key={item.cartId} className="flex gap-4">
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0">
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
                                                <div className="flex-1 flex flex-col justify-center">
                                                    <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                                                    {item.variant && (
                                                        <p className="text-xs text-text-sub">{item.variant}</p>
                                                    )}
                                                </div>
                                                <div className="flex flex-col justify-center text-right">
                                                    <span className="text-sm font-bold text-primary">
                                                        MUR {(item.price * item.quantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-sub">Subtotal</span>
                                            <span className="font-medium text-primary">MUR {subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-sub">Shipping</span>
                                            <span className="font-medium text-primary">
                                                {shipping === 0 ? 'Free' : `MUR ${shipping.toLocaleString()}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-sub">Estimated Taxes</span>
                                            <span className="font-medium text-primary">MUR {tax.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 mt-4 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-primary">Total</span>
                                            <div className="text-right">
                                                <span className="text-xs text-text-sub block mb-1">MUR</span>
                                                <span className="text-2xl font-bold text-primary">MUR {total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Phase 3: Success */}
                    {phase === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="py-12"
                        >
                            <OrderSuccess items={orderedItems} total={orderTotal} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
