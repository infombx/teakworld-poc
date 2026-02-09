import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-primary mb-2">
                            <div className="size-6 text-accent">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd" />
                                    <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold font-display">Teakworld</span>
                        </div>
                        <p className="text-text-sub text-sm leading-relaxed">
                            Crafting premium teak furniture for modern homes since 1985. Experience the difference of true quality.
                        </p>
                    </div>

                    {/* Shop Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-primary font-bold font-display">Shop</h4>
                        <Link href="#" className="text-text-sub hover:text-accent text-sm transition-colors">Living Room</Link>
                        <Link href="#" className="text-text-sub hover:text-accent text-sm transition-colors">Dining Room</Link>
                        <Link href="#" className="text-text-sub hover:text-accent text-sm transition-colors">Bedroom</Link>
                        <Link href="#" className="text-text-sub hover:text-accent text-sm transition-colors">Outdoor</Link>
                    </div>

                    {/* Support Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-primary font-bold font-display">Support</h4>
                        <Link href="#" className="text-text-sub hover:text-accent text-sm transition-colors">Contact Us</Link>
                        <Link href="#" className="text-text-sub hover:text-accent text-sm transition-colors">Shipping & Returns</Link>
                        <Link href="#" className="text-text-sub hover:text-accent text-sm transition-colors">Care Instructions</Link>
                        <Link href="#" className="text-text-sub hover:text-accent text-sm transition-colors">FAQ</Link>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-primary font-bold font-display">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="size-10 flex items-center justify-center rounded-full bg-gray-100 text-text-main hover:bg-accent hover:text-white transition-colors">
                                <span className="font-bold text-xs">IG</span>
                            </a>
                            <a href="#" className="size-10 flex items-center justify-center rounded-full bg-gray-100 text-text-main hover:bg-accent hover:text-white transition-colors">
                                <span className="font-bold text-xs">FB</span>
                            </a>
                            <a href="#" className="size-10 flex items-center justify-center rounded-full bg-gray-100 text-text-main hover:bg-accent hover:text-white transition-colors">
                                <span className="font-bold text-xs">PT</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-sub">
                    <p>© 2024 Teakworld Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
