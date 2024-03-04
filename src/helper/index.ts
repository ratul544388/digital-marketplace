import { useCartStore } from "@/hooks/use-cart-store";
import { useMemo } from "react";

export const GetCartTotal = () => {
  const { cart } = useCartStore();

  const total = useMemo(() => {
    return cart.reduce((total, product) => {
      return (total += product.price);
    }, 0);
  }, [cart]);

  return total;
};
