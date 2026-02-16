'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

const icons: Record<ToastType, JSX.Element> = {
    success: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    ),
    error: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    info: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};

const styles: Record<ToastType, string> = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const iconStyles: Record<ToastType, string> = {
    success: 'bg-emerald-100 text-emerald-600',
    error: 'bg-red-100 text-red-600',
    info: 'bg-blue-100 text-blue-600',
};

export default function Toast({ message, type, isVisible, onClose, duration = 5000 }: ToastProps) {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -24, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed top-6 right-6 z-[100] max-w-md w-full pointer-events-auto"
                >
                    <div className={`flex items-start gap-3 px-5 py-4 rounded-xl border shadow-lg backdrop-blur-sm ${styles[type]}`}>
                        <div className={`flex-shrink-0 p-1.5 rounded-full ${iconStyles[type]}`}>
                            {icons[type]}
                        </div>
                        <p className="flex-1 text-sm font-medium leading-snug pt-0.5">{message}</p>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
                        >
                            <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ── Hook for easy usage ──────────────────────────────────────────────
export function useToast() {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const showToast = (message: string, type: ToastType = 'info') => {
        setToast({ message, type });
    };

    const hideToast = () => setToast(null);

    const ToastComponent = toast ? (
        <Toast
            message={toast.message}
            type={toast.type}
            isVisible={true}
            onClose={hideToast}
        />
    ) : null;

    return { showToast, hideToast, ToastComponent };
}
