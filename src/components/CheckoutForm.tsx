'use client';

import { useState } from 'react';

import { z } from 'zod';

interface CheckoutFormProps {
    onSubmit: (data: FormData) => void;
    isSubmitting: boolean;
}

const checkoutSchema = z.object({
    email: z.string().email('Invalid email address'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    address: z.string().min(1, 'Address is required'),
    apartment: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(5, 'Invalid ZIP code'),
    country: z.string(),
});

type FormData = z.infer<typeof checkoutSchema>;

export default function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            checkoutSchema.parse(formData);
            setErrors({});
            onSubmit(formData);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof FormData, string>> = {};
                error.issues.forEach((err: z.ZodIssue) => {
                    if (err.path[0]) {
                        newErrors[err.path[0] as keyof FormData] = err.message;
                    }
                });
                setErrors(newErrors);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-primary font-display">Contact Information</h2>
                    <span className="text-sm text-text-sub">
                        Already have an account?{' '}
                        <a href="#" className="text-primary underline hover:no-underline font-medium">Log in</a>
                    </span>
                </div>
                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            className={`w-full h-12 px-4 rounded-lg border bg-white text-primary placeholder-gray-400 focus:ring-accent transition shadow-sm ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                                }`}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-text-sub group-hover:text-primary transition-colors">
                            Email me with news and offers
                        </span>
                    </label>
                </div>
            </section>

            {/* Shipping Address */}
            <section>
                <h2 className="text-xl font-bold text-primary mb-6 font-display">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-full md:col-span-2">
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-lg border-gray-300 bg-white text-primary focus:border-accent focus:ring-accent transition shadow-sm"
                        >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First name"
                            className={`w-full h-12 px-4 rounded-lg border bg-white text-primary placeholder-gray-400 focus:ring-accent transition shadow-sm ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                                }`}
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last name"
                            className={`w-full h-12 px-4 rounded-lg border bg-white text-primary placeholder-gray-400 focus:ring-accent transition shadow-sm ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                                }`}
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                    <div className="col-span-full md:col-span-2">
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className={`w-full h-12 px-4 rounded-lg border bg-white text-primary placeholder-gray-400 focus:ring-accent transition shadow-sm ${errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                                }`}
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                    </div>
                    <div className="col-span-full md:col-span-2">
                        <input
                            type="text"
                            name="apartment"
                            value={formData.apartment}
                            onChange={handleChange}
                            placeholder="Apartment, suite, etc. (optional)"
                            className="w-full h-12 px-4 rounded-lg border-gray-300 bg-white text-primary placeholder-gray-400 focus:border-accent focus:ring-accent transition shadow-sm"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className={`w-full h-12 px-4 rounded-lg border bg-white text-primary placeholder-gray-400 focus:ring-accent transition shadow-sm ${errors.city ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                                }`}
                        />
                        {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                    </div>
                    <div>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={`w-full h-12 px-4 rounded-lg border bg-white text-primary focus:ring-accent transition shadow-sm ${errors.state ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                                }`}
                        >
                            <option value="">State</option>
                            <option>California</option>
                            <option>New York</option>
                            <option>Texas</option>
                            <option>Florida</option>
                        </select>
                        {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            placeholder="ZIP code"
                            className={`w-full h-12 px-4 rounded-lg border bg-white text-primary placeholder-gray-400 focus:ring-accent transition shadow-sm ${errors.zipCode ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                                }`}
                        />
                        {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
                    </div>
                </div>
            </section>

            {/* Shipping Method */}
            <section>
                <h2 className="text-xl font-bold text-primary mb-6 font-display">Shipping Method</h2>
                <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 rounded-lg border border-gray-300 hover:border-accent cursor-pointer transition-colors bg-white group">
                        <div className="flex items-center gap-4">
                            <input
                                type="radio"
                                name="shippingMethod"
                                value="standard"
                                defaultChecked
                                className="w-5 h-5 border-gray-300 text-accent focus:ring-accent"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-primary">Standard Shipping</span>
                                <span className="text-sm text-text-sub">Curbside delivery (5-7 business days)</span>
                            </div>
                        </div>
                        <span className="font-semibold text-primary">Free</span>
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-lg border border-gray-300 hover:border-accent cursor-pointer transition-colors bg-white group">
                        <div className="flex items-center gap-4">
                            <input
                                type="radio"
                                name="shippingMethod"
                                value="whiteGlove"
                                className="w-5 h-5 border-gray-300 text-accent focus:ring-accent"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-primary">White Glove Delivery</span>
                                <span className="text-sm text-text-sub">In-room setup & debris removal</span>
                            </div>
                        </div>
                        <span className="font-semibold text-primary">MUR 199.00</span>
                    </label>
                </div>
            </section>

            {/* Submit */}
            <div className="pt-6 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 bg-accent text-white font-bold rounded-lg shadow-lg hover:bg-accent/90 focus:ring-4 focus:ring-accent/30 transition-all transform active:scale-95 text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        'Place Order'
                    )}
                </button>
            </div>
        </form>
    );
}
