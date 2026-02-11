'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';

export default function Header() {
    const { toggleSidebar, getItemCount } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const itemCount = getItemCount();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-40 bg-primary shadow-lg">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.svg"
                            alt="Teakworld"
                            width={169}
                            height={24}
                            className="h-6 w-auto"
                            priority
                        />
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-white/80 hover:text-white font-medium transition-colors">
                            Home
                        </Link>
                        <Link href="/#products" className="text-white/80 hover:text-white font-medium transition-colors">
                            Products
                        </Link>
                        <Link href="/#about" className="text-white/80 hover:text-white font-medium transition-colors">
                            About
                        </Link>
                        <Link href="/#contact" className="text-white/80 hover:text-white font-medium transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Cart Button */}
                    <button
                        onClick={toggleSidebar}
                        className="relative p-2 text-white/80 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {mounted && itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {itemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
