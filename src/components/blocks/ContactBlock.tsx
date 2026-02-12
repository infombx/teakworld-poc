import { ContactBlock as ContactBlockType } from '@/lib/strapi';
import ContactForm from '@/components/ContactForm';

interface ContactBlockProps {
    block: ContactBlockType;
}

export default function ContactBlock({ block }: ContactBlockProps) {
    return (
        <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-accent to-transparent" />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-6">
                    <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>

                    {block.subtitle && (
                        <p className="text-gray-300 text-lg">
                            {block.subtitle}
                        </p>
                    )}

                    <ContactForm
                        title={block.title}
                        buttonText={block.buttonText || 'Get in Touch'}
                    />
                </div>
            </div>
        </section>
    );
}
