"use client";

import { cartAction } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart-store";
import { productWithImages } from "@/types";
import { useTransition } from "react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: productWithImages;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const [_, startTransition] = useTransition();
  const { setCart, addToCart, cart, deleteCart } = useCartStore();
  const isAddedToCart = cart.some((item) => item.id === product.id);

  const handleClick = () => {
    const prevCart = cart;
    startTransition(() => {
      if (isAddedToCart) {
        deleteCart(product.id);
      } else {
        addToCart(product);
      }
      cartAction(product.id).then(({ error }) => {
        if (error) {
          setCart(prevCart);
          toast.error(error);
        }
      });
    });
  };


  return (
    <Button onClick={handleClick} className="w-full max-w-[400px] mt-5">
      {isAddedToCart ? "Added to cart" : "Add to cart"}
    </Button>
  );
};
