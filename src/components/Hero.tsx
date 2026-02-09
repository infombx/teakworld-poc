import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative">
            <div
                className="flex min-h-[600px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 text-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1618220179428-22790b461013?w=1920&q=80")`,
                }}
            >
                <div className="flex flex-col gap-4 max-w-3xl">
                    <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight font-display">
                        Handcrafted <span className="bg-gradient-to-r from-accent to-teal-400 bg-clip-text text-transparent">Teak</span> Furniture
                    </h1>
                    <h2 className="text-gray-100 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto drop-shadow-md">
                        Sustainable luxury for your home. Meticulously designed for timeless elegance and durability.
                    </h2>
                </div>
                <div className="mt-4">
                    <Link
                        href="#products"
                        className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-accent hover:bg-accent/90 transition-all text-white text-base font-bold tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
