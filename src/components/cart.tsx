"use client";

import { getCart } from "@/actions/cart";
import { useCartStore } from "@/hooks/use-cart-store";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { CartEmpty } from "./cart-empty";
import { CartItem } from "./cart-item";
import { Button, buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CartItems } from "./cart-items";
import { GetCartTotal } from "@/helper";
import { transitionFee } from "@/constants";

interface CartProps {}

export const Cart = ({}: CartProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { cart, setCart } = useCartStore();
  const [_, startTransition] = useTransition();

  const total = GetCartTotal();

  useEffect(() => {
    if (user) {
      startTransition(() => {
        getCart().then(({ cart, error }) => {
          if (cart) {
            setCart(cart);
          } else {
            toast.error(error);
          }
        });
      });
    }
  }, [user, setCart]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="text-muted-foreground absolute -right-2">
            {cart.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0 p-0 text-sm">
        <div className="font-medium h-12 flex items-center justify-center border-b shadow-sm">
          {`Cart(${cart.length})`}
        </div>
        <ScrollArea className={cn("h-[calc(100vh_-_48px)] pt-3")}>
          <CartItems onClose={handleClose} />
          {!!cart.length && (
            <div className="p-4">
              <Separator />
              <div className="flex justify-between text-muted-foreground mt-2">
                Fiat Transition Fee:
                <p className="text-foreground font-medium">
                  ${transitionFee.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between text-muted-foreground mt-1">
                Total:
                <p className="text-foreground font-medium">
                  ${(total + transitionFee).toFixed(2)}
                </p>
              </div>
              <Link
                onClick={handleClose}
                href="/checkout"
                className={cn(buttonVariants(), "mt-4 w-full")}
              >
                Continue to checkout
              </Link>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
