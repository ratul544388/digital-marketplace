"use client";

import { checkout } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart-store";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const CheckoutButton = () => {
  const { cart } = useCartStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(() => {
      checkout().then(({ url, error }) => {
        if (url) {
          router.push(url);
        } else {
          window.alert(error);
        }
      });
    });
  };
  return (
    <Button
      onClick={handleClick}
      className="w-full"
      disabled={!!!cart.length || isPending}
    >
      Checkout
    </Button>
  );
};
