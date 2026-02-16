/**
 * Task 5 (frontend) — placeOrder service
 *
 * Builds the request payload from checkout form data + cart items,
 * injects defaults for missing fields, validates with zod, then
 * POSTs to the Strapi create-order endpoint.
 */
import { z } from "zod";
import { CartItem } from "@/stores/cartStore";

const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// ── Zod schema matching the backend yup schema ──────────────────────
const placeOrderSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    nid: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
    state: z.string().optional(),
    postCode: z.string().min(1),
    delivery: z.enum(["free", "express", "pick-up"]),
    items: z
        .array(
            z.object({
                documentId: z.string().min(1),
                quantity: z.number().int().positive(),
                color: z.string().min(1),
            })
        )
        .min(1, "Cart must have at least one item"),
});

export type PlaceOrderPayload = z.infer<typeof placeOrderSchema>;

// ── Form data shape coming from CheckoutForm ────────────────────────
interface CheckoutFormData {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface PlaceOrderResult {
    message: string;
    documentId: string;
}

/**
 * Build the payload, validate it, and POST to Strapi.
 *
 * @param formData - Data from CheckoutForm (does NOT include phone/nid)
 * @param cartItems - Items from the cart store
 * @returns The backend response containing orderId
 * @throws Error with user-facing message on validation or network failure
 */
export async function placeOrder(
    formData: CheckoutFormData,
    cartItems: CartItem[]
): Promise<PlaceOrderResult> {
    // 1. Build payload — map form fields + inject defaults for missing ones
    const payload: PlaceOrderPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: "0000000000", // default — form does not collect phone
        nid: "N/A", // default — form does not collect nid
        street: formData.address, // form field "address" → schema "street"
        city: formData.city,
        country: formData.country,
        state: formData.state || undefined,
        postCode: formData.zipCode, // form field "zipCode" → schema "postCode"
        delivery: "free", // default — shipping radio not wired into form data
        items: cartItems.map((item) => ({
            documentId: item.documentId,
            quantity: item.quantity,
            color: item.variant || "default", // cart "variant" → schema "colour"
        })),
    };

    // 2. Validate before sending
    const result = placeOrderSchema.safeParse(payload);
    if (!result.success) {
        const messages = result.error.issues
            .map((i) => `${i.path.join(".")}: ${i.message}`)
            .join("; ");
        throw new Error(`Validation failed: ${messages}`);
    }

    // 3. POST to Strapi
    const response = await fetch(`${STRAPI_URL}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: result.data }),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const detail =
            errorBody?.error?.message || errorBody?.message || response.statusText;
        throw new Error(`Order failed: ${detail}`);
    }

    return response.json();
}
