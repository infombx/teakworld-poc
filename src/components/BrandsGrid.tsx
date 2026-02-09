export default function BrandsGrid() {
    const brands = [
        { name: 'VOGUE', icon: 'apartment' },
        { name: 'AD', icon: 'architecture' },
        { name: 'ELLE DECOR', icon: 'chair_alt' },
        { name: 'DWELL', icon: 'cottage' },
    ];

    return (
        <section className="border-b border-gray-100 bg-white py-8">
            <div className="max-w-[1440px] mx-auto px-4">
                <p className="text-center text-sm font-medium text-text-sub mb-6 uppercase tracking-widest">
                    As seen in
                </p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {brands.map((brand) => (
                        <div key={brand.name} className="flex items-center gap-2">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                {brand.icon === 'apartment' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                )}
                                {brand.icon === 'architecture' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                                )}
                                {brand.icon === 'chair_alt' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                )}
                                {brand.icon === 'cottage' && (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                                )}
                            </svg>
                            <span className="font-bold text-xl font-display">{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
