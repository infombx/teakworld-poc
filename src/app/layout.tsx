import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";

export const metadata: Metadata = {
    title: "Teakworld - Handcrafted Teak Furniture",
    description: "Sustainable luxury teak furniture for your home. Meticulously designed for timeless elegance and durability.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-body bg-background-light text-text-main antialiased min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartSidebar />
            </body>
        </html>
    );
}
