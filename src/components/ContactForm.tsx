'use client';

import { useState } from 'react';
import { z } from 'zod';

const contactSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
    title: string;
    buttonText: string;
}

export default function ContactForm({ title, buttonText }: ContactFormProps) {
    const [formData, setFormData] = useState<ContactFormData>({
        fullName: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof ContactFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Validate form data
            contactSchema.parse(formData);
            setErrors({});
            setIsSubmitting(true);

            // Simulate API call (replace with actual Strapi submission)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Success
            setSubmitStatus('success');
            setFormData({ fullName: '', email: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
                error.issues.forEach((err: z.ZodIssue) => {
                    if (err.path[0]) {
                        newErrors[err.path[0] as keyof ContactFormData] = err.message;
                    }
                });
                setErrors(newErrors);
            } else {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus('idle'), 5000);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-white mb-4 text-center font-display">
                {title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full h-12 px-4 rounded-lg border bg-white dark:bg-surface text-primary dark:text-white placeholder-gray-400 focus:ring-accent transition shadow-sm ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-white/10 focus:border-accent'
                            }`}
                        placeholder="John Doe"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full h-12 px-4 rounded-lg border bg-white dark:bg-surface text-primary dark:text-white placeholder-gray-400 focus:ring-accent transition shadow-sm ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-white/10 focus:border-accent'
                            }`}
                        placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-surface text-primary dark:text-white placeholder-gray-400 focus:ring-accent transition shadow-sm resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-white/10 focus:border-accent'
                            }`}
                        placeholder="Tell us about your project..."
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 bg-accent text-white font-bold rounded-lg shadow-lg hover:bg-accent/90 focus:ring-4 focus:ring-accent/30 transition-all transform active:scale-95 text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : (
                        buttonText
                    )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                        <p className="text-green-800 dark:text-green-200 font-medium">
                            Thank you! Your message has been sent successfully.
                        </p>
                    </div>
                )}
                {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center">
                        <p className="text-red-800 dark:text-red-200 font-medium">
                            Something went wrong. Please try again later.
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
}
