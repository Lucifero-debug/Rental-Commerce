import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

export const useCartStore = create((set) => ({
  cart: [],
  isLoading: true,
  counter: 0, // Initialize counter to 0
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || [],
        isLoading: false,
        counter: cart?.lineItems.length || 0,
      });
      if (typeof window !== 'undefined') { // Check if in the browser
        localStorage.setItem('cartCounter', cart?.lineItems.length || 0); // Update local storage
      }
    } catch (err) {
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });

    const newCounter = response.cart?.lineItems.length || 0;

    set({
      cart: response.cart,
      counter: newCounter,
      isLoading: false,
    });

    if (typeof window !== 'undefined') { // Check if in the browser
      localStorage.setItem('cartCounter', newCounter); // Update local storage
    }
  },
  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );

    const newCounter = response.cart?.lineItems.length || 0;

    set({
      cart: response.cart,
      counter: newCounter,
      isLoading: false,
    });

    if (typeof window !== 'undefined') { // Check if in the browser
      localStorage.setItem('cartCounter', newCounter); // Update local storage
    }
  },
}));

// Initialize counter from local storage on the client side
if (typeof window !== 'undefined') {
  const storedCounter = localStorage.getItem('cartCounter');
  if (storedCounter) {
    useCartStore.setState({ counter: parseInt(storedCounter) || 0 });
  }
}
