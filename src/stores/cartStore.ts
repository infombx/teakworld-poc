import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    cartId: string;
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
    addItem: (item: Omit<CartItem, 'quantity' | 'cartId'> & { quantity?: number }) => void;
    removeItem: (cartId: string) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    clearCart: () => void;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: () => void;
    getSubtotal: () => number;
    getItemCount: () => number;
    getItemQuantity: (documentId: string, variant?: string) => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (item) => {
                const { items } = get();
                const cartId = `${item.documentId}-${item.variant || 'default'}`;
                const existingItem = items.find((i) => i.cartId === cartId);
                const quantityToAdd = item.quantity || 1;

                if (existingItem) {
                    set({
                        items: items.map((i) =>
                            i.cartId === cartId
                                ? { ...i, quantity: i.quantity + quantityToAdd }
                                : i
                        ),
                        isOpen: true,
                    });
                } else {
                    set({
                        items: [...items, { ...item, cartId, quantity: quantityToAdd }],
                        isOpen: true,
                    });
                }
            },

            removeItem: (cartId) => {
                set({
                    items: get().items.filter((i) => i.cartId !== cartId),
                });
            },

            updateQuantity: (cartId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(cartId);
                    return;
                }
                set({
                    items: get().items.map((i) =>
                        i.cartId === cartId ? { ...i, quantity } : i
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

            getItemQuantity: (documentId, variant) => {
                const cartId = `${documentId}-${variant || 'default'}`;
                const item = get().items.find((i) => i.cartId === cartId);
                return item ? item.quantity : 0;
            },
        }),
        {
            name: 'teakworld-cart',
            version: 1,
        }
    )
);
