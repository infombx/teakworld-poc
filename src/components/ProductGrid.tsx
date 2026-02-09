import { Product } from '@/lib/strapi';
import ProductCard from './ProductCard';
import Link from 'next/link';

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <section id="products" className="py-16 md:py-24 bg-background-light">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <span className="text-accent font-bold tracking-widest text-sm uppercase mb-2 block">
                            New Arrivals
                        </span>
                        <h2 className="text-primary text-3xl md:text-4xl font-bold leading-tight font-display">
                            Featured Products
                        </h2>
                    </div>
                    <Link
                        href="#"
                        className="text-primary font-medium hover:text-accent flex items-center gap-1 transition-colors group"
                    >
                        View all collection
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {products.map((product) => (
                        <ProductCard key={product.documentId} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
