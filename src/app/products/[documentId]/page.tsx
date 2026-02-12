import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetailClient from '@/components/ProductDetailClient';
import ProductDetailSkeleton from '@/components/ProductDetailSkeleton';
import { fetchProduct, fetchAllProducts } from '@/lib/strapi/fetchProduct';

interface ProductPageProps {
    params: Promise<{
        documentId: string;
    }>;
}

// Generate static params for SSG
export async function generateStaticParams() {
    const products = await fetchAllProducts();
    return products.map((product) => ({
        documentId: product.documentId,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { documentId } = await params;
    const product = await fetchProduct(documentId);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    const description = product.description?.[0]?.children?.[0]?.text || '';

    return {
        title: `${product.title} | Teakworld`,
        description: description.substring(0, 160),
        openGraph: {
            title: product.title,
            description: description.substring(0, 160),
            images: product.featuredImage ? [product.featuredImage.url] : [],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { documentId } = await params;
    const product = await fetchProduct(documentId);

    if (!product) {
        notFound();
    }

    return (
        <Suspense fallback={<ProductDetailSkeleton />}>
            <ProductDetailClient product={product} />
        </Suspense>
    );
}
