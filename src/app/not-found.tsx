import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-background-light px-4">
            <div className="text-center">
                {/* 404 Icon */}
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-16 h-16 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    </div>
                </div>

                {/* Text */}
                <h1 className="text-6xl font-black text-primary mb-4 font-display">404</h1>
                <h2 className="text-2xl font-bold text-primary mb-2 font-display">Page Not Found</h2>
                <p className="text-text-sub mb-8 max-w-md mx-auto">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                    Perhaps you&apos;ve mistyped the URL or the page has been moved.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Back to Home
                    </Link>
                    <Link
                        href="/#products"
                        className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-primary font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    );
}
