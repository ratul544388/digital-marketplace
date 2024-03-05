"use client";

import { cartAction, getCart } from "@/actions/cart";
import { transitionFee } from "@/constants";
import { GetCartTotal } from "@/helper";
import { useCartStore } from "@/hooks/use-cart-store";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { CartItem } from "./cart-item";
import { Button, buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { InfoBlock } from "./info-block";
import { CartEmpty } from "./cart-empty";

interface CartProps {}

export const Cart = ({}: CartProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const { cart, setCart, setIsPending } = useCartStore();
  const [_, startTransition] = useTransition();

  const total = GetCartTotal();

  const handleRemove = (productId: string) => {
    const prevCart = cart;
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    startTransition(() => {
      cartAction(productId).then(({ error }) => {
        if (error) {
          setCart(prevCart);
        }
      });
    });
  };

  useEffect(() => {
    if (user) {
      startTransition(() => {
        getCart().then(({ cart, error }) => {
          if (cart) {
            setCart(cart);
            setIsPending(false);
          } else {
            toast.error(error);
          }
        });
      });
    }
  }, [user, setCart, setIsPending]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="group relative hover:bg-transparent hover:text-primary"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-muted-foreground group-hover:text-primary absolute -right-2">
            {cart.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0 p-0 text-sm">
        <div className="font-medium h-12 flex items-center justify-center border-b shadow-sm">
          {`Cart(${cart.length})`}
        </div>
        <ScrollArea className={cn("h-[calc(100vh_-_48px)] pt-3")}>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              onRemove={() => handleRemove(product.id)}
              name={product.name}
              price={product.price}
              category={product.category}
              slug={product.slug}
              image={product.images[0].url}
              blurDataUrl={product.images[0].blurDataUrl}
            />
          ))}
          {!!!cart.length && <CartEmpty />}
          {!!cart.length && (
            <div className="p-4 flex flex-col gap-2">
              <Separator />
              <InfoBlock label="Fiat Transion Fee" value={transitionFee} />
              <InfoBlock label="Total" value={total + transitionFee} />
              <Link
                onClick={handleClose}
                href="/checkout"
                className={cn(buttonVariants(), "mt-2 w-full")}
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
