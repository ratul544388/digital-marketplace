import { productWithImages } from "@/types";
import { create } from "zustand";

interface ModalStore {
  cart: productWithImages[];
  setCart: (products: productWithImages[]) => void;
  addToCart: (product: productWithImages) => void;
  deleteCart: (productId: string) => void;
  isPending: boolean;
  setIsPending: (value: boolean) => void;
}

export const useCartStore = create<ModalStore>((set) => ({
  cart: [],
  setCart: (products: productWithImages[]) => set({ cart: products }),
  addToCart: (product: productWithImages) =>
    set((state) => ({
      cart: [product, ...state.cart],
    })),
  deleteCart: (productId: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  isPending: true,
  setIsPending: (value: boolean) => set({ isPending: value }),
}));
