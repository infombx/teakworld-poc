import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    documentId: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
    variant?: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (documentId: string) => void;
    updateQuantity: (documentId: string, quantity: number) => void;
    clearCart: () => void;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: () => void;
    getSubtotal: () => number;
    getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (item) => {
                const { items } = get();
                const existingItem = items.find((i) => i.documentId === item.documentId);

                if (existingItem) {
                    set({
                        items: items.map((i) =>
                            i.documentId === item.documentId
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                        ),
                        isOpen: true,
                    });
                } else {
                    set({
                        items: [...items, { ...item, quantity: 1 }],
                        isOpen: true,
                    });
                }
            },

            removeItem: (documentId) => {
                set({
                    items: get().items.filter((i) => i.documentId !== documentId),
                });
            },

            updateQuantity: (documentId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(documentId);
                    return;
                }
                set({
                    items: get().items.map((i) =>
                        i.documentId === documentId ? { ...i, quantity } : i
                    ),
                });
            },

            clearCart: () => set({ items: [] }),
            toggleSidebar: () => set({ isOpen: !get().isOpen }),
            closeSidebar: () => set({ isOpen: false }),
            openSidebar: () => set({ isOpen: true }),

            getSubtotal: () => {
                return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            },

            getItemCount: () => {
                return get().items.reduce((sum, item) => sum + item.quantity, 0);
            },
        }),
        {
            name: 'teakworld-cart',
        }
    )
);
