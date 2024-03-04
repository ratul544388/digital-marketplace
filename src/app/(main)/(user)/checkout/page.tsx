"use client";

import { CartEmpty } from "@/components/cart-empty";
import { CartItem } from "@/components/cart-item";
import { CartItems } from "@/components/cart-items";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { transitionFee } from "@/constants";
import { GetCartTotal } from "@/helper";
import { useCartStore } from "@/hooks/use-cart-store";

const CheckoutPage = () => {
  const { cart } = useCartStore();
  const total = GetCartTotal();
  return (
    <div className="flex flex-col gap-8">
      <PageHeading>Shopping Cart</PageHeading>
      <div className="grid w-full md:grid-cols-2 gap-12 md:gap-20 max-w-[800px] mx-auto">
        <div className="space-y-6">
          <CartItems />
        </div>
        <div className="p-6 w-full h-fit space-y-5 rounded-md bg-secondary text-sm font-medium">
          <h3 className="font-bold text-base">Order summary</h3>
          <div className="flex items-center justify-between gap-5 text-muted-foreground">
            Subtotal
            <p className="text-foreground">${total.toFixed(2)}</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-5 text-muted-foreground">
            Fiat Transition Fee
            <p className="text-foreground">${transitionFee.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between gap-5">
            Order Total
            <p className="text-foreground">
              ${(total + transitionFee).toFixed(2)}
            </p>
          </div>
          <Button className="w-full" disabled={!!!cart.length}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
