"use client";

import { productWithImages } from "@/types";
import { Image } from "./Image";
import { Button } from "./ui/button";
import { useCartStore } from "@/hooks/use-cart-store";
import { useTransition } from "react";
import { cartAction } from "@/actions/cart";
import { X } from "lucide-react";
import { CartEmpty } from "./cart-empty";

interface CartItemsProps {
    onClose?: () => void;
}

export const CartItems = ({
    onClose,
}: CartItemsProps) => {
  const { cart, setCart, deleteCart } = useCartStore();
  const [_, startTransition] = useTransition();
  const handleRemove = (productId: string) => {
    const prevCart = cart;
    deleteCart(productId);
    startTransition(() => {
      cartAction(productId).then(({ error }) => {
        if (error) {
          setCart(prevCart);
        }
      });
    });
  };

  return (
    <section className="">
      {cart.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-3 px-4 py-2 hover:bg-secondary transition-colors"
        >
          <Image
            src={product.images[0].url}
            alt={product.name}
            blurDataURL={product.images[0].blurDataUrl}
            className="max-w-[80px]"
          />
          <div className="text-sm w-full">
            <div className="flex items-center justify-between gap-5">
              <h3 className="font-medium">{product.name}</h3>
              <p className="font-medium">${product.price}</p>
            </div>
            <p className="text-muted-foreground">{product.category}</p>
            <Button
              onClick={() => handleRemove(product.id)}
              className="h-7 px-2 mt-1 text-muted-foreground"
              variant="ghost"
            >
              <X className="h-4 w-4 mr-2 text-muted-foreground" />
              Remove
            </Button>
          </div>
        </div>
      ))}
      {!!!cart.length && <CartEmpty onClose={onClose} />}
    </section>
  );
};
