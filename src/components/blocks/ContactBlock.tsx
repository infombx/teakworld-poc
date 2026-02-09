import { ContactBlock as ContactBlockType } from '@/lib/strapi';

interface ContactBlockProps {
    block: ContactBlockType;
}

export default function ContactBlock({ block }: ContactBlockProps) {
    return (
        <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-accent to-transparent" />

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-6">
                    <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>

                    <h2 className="text-3xl md:text-4xl font-bold font-display">
                        {block.title}
                    </h2>

                    {block.subtitle && (
                        <p className="text-gray-300 text-lg">
                            {block.subtitle}
                        </p>
                    )}

                    <form className="w-full mt-6 flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-5 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                        <button
                            type="submit"
                            className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition-colors whitespace-nowrap"
                        >
                            {block.buttonText || 'Get in Touch'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
