import { ContentBlock } from '@/lib/strapi';
import HeroBlock from './HeroBlock';
import BrandsBlock from './BrandsBlock';
import ProductsGridBlock from './ProductsGridBlock';
import AboutBlock from './AboutBlock';
import ContactBlock from './ContactBlock';

interface BlockRendererProps {
    blocks: ContentBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
    return (
        <>
            {blocks.map((block, index) => {
                const key = `${block.__component}-${block.id || index}`;

                switch (block.__component) {
                    case 'blocks.hero-banner':
                        return <HeroBlock key={key} block={block} />;
                    case 'blocks.brands':
                        return <BrandsBlock key={key} block={block} />;
                    case 'blocks.products-grid':
                        return <ProductsGridBlock key={key} block={block} />;
                    case 'blocks.about':
                        return <AboutBlock key={key} block={block} />;
                    case 'blocks.contact':
                        return <ContactBlock key={key} block={block} />;
                    default:
                        console.warn(`Unknown block type: ${(block as ContentBlock).__component}`);
                        return null;
                }
            })}
        </>
    );
}
