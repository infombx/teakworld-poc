import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
    return (
        <section id="about" className="py-20 bg-gray-50">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Image */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                                alt="Carpenter working on wood"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-white p-4 rounded-xl shadow-xl hidden md:flex flex-col items-center justify-center text-center">
                            <span className="text-4xl font-black text-accent font-display">50+</span>
                            <span className="text-sm text-text-sub font-medium mt-1">
                                Years of<br />Excellence
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        <span className="text-accent font-bold tracking-widest text-sm uppercase">Our Story</span>
                        <h2 className="text-primary text-3xl md:text-5xl font-bold leading-tight font-display">
                            Generations of Craftsmanship
                        </h2>
                        <p className="text-text-sub text-lg leading-relaxed">
                            At Teakworld, we believe that furniture should be more than just functional—it should be a legacy.
                            Sourced from sustainable plantations and handcrafted by master artisans, each piece tells a story of
                            tradition, durability, and natural beauty.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div className="flex flex-col gap-2">
                                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 10-8.636 12.952M12.75 3.031a9 9 0 016.862 14.207" />
                                </svg>
                                <h4 className="font-bold text-primary font-display">Sustainable Sourcing</h4>
                                <p className="text-sm text-text-sub">100% certified plantation teak.</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                                </svg>
                                <h4 className="font-bold text-primary font-display">Handmade Quality</h4>
                                <p className="text-sm text-text-sub">Crafted with precision and care.</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Link
                                href="#"
                                className="inline-flex items-center gap-2 text-primary font-bold border-b-2 border-accent pb-1 hover:text-accent transition-colors"
                            >
                                Learn more about us
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
