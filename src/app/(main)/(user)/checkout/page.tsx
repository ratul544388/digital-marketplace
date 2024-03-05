"use client";

import { cartAction } from "@/actions/cart";
import { CartItem } from "@/components/cart-item";
import { InfoBlock } from "@/components/info-block";
import { PageHeading } from "@/components/page-heading";
import { Separator } from "@/components/ui/separator";
import { transitionFee } from "@/constants";
import { GetCartTotal } from "@/helper";
import { useCartStore } from "@/hooks/use-cart-store";
import { Loader } from "@/loader";
import { startTransition } from "react";
import { CheckoutButton } from "./_components/checkout-button";
import { CartEmpty } from "@/components/cart-empty";

const CheckoutPage = () => {
  const { isPending } = useCartStore();
  const total = GetCartTotal();
  const { cart, setCart } = useCartStore();

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

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeading>Shopping Cart</PageHeading>
      <div className="grid w-full md:grid-cols-2 gap-12 md:gap-20 max-w-[800px] mx-auto">
        <div className="flex flex-col gap-5">
          {cart.map(({ name, price, category, images, id }) => (
            <CartItem
              key={id}
              name={name}
              category={category}
              price={price}
              image={images[0].url}
              blurDataUrl={images[0].blurDataUrl}
              onRemove={() => handleRemove(id)}
              className="bg-secondary"
            />
          ))}
        </div>
        {!!!cart.length && <CartEmpty />}
        <div className="p-6 w-full h-fit flex flex-col gap-5 rounded-md bg-secondary text-sm font-medium">
          <h3 className="font-bold text-base">Order summary</h3>
          <InfoBlock label="Subtotal" value={total} />
          <Separator className="bg-background" />
          <InfoBlock label="Fiat Transition Fee" value={transitionFee} />
          <InfoBlock
            label="Order total"
            value={total + transitionFee}
            className="font-bold"
          />
          <CheckoutButton />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
