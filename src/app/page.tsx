import { fetchPage } from '@/lib/strapi';
import { BlockRenderer } from '@/components/blocks';

export default async function HomePage() {
    const page = await fetchPage('home');

    if (!page) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-text-sub">Failed to load page content</p>
            </div>
        );
    }

    return <BlockRenderer blocks={page.blocks} />;
}
