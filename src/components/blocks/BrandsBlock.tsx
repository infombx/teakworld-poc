import Image from 'next/image';
import { BrandsBlock as BrandsBlockType, getImageUrl } from '@/lib/strapi';

interface BrandsBlockProps {
    block: BrandsBlockType;
}

export default function BrandsBlock({ block }: BrandsBlockProps) {
    return (
        <section className="border-b border-gray-100 bg-white py-8">
            <div className="max-w-[1440px] mx-auto px-4">
                {block.title && (
                    <p className="text-center text-sm font-medium text-text-sub mb-6 uppercase tracking-widest">
                        {block.title}
                    </p>
                )}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {block.brands?.map((brand) => (
                        <div key={brand.documentId} className="flex items-center justify-center h-12 w-32">
                            {brand.logo ? (
                                <Image
                                    src={getImageUrl(brand.logo)}
                                    alt={brand.name}
                                    width={128}
                                    height={48}
                                    className="object-contain h-full w-auto max-h-12"
                                />
                            ) : (
                                <span className="font-bold text-xl font-display text-primary">{brand.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
