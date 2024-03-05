import { CartItem } from "@/components/cart-item";
import { InfoBlock } from "@/components/info-block";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { transitionFee } from "@/constants";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import PaymentSuccessImage from "@/../public/images/payment-success.jpg";

const Page = async ({ params }: { params: { orderId: string } }) => {
  const user = await currentUser();
  const order = await db.order.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      orderItems: true,
    },
  });

  if (!order) {
    notFound();
  }

  const total = order.orderItems.reduce((total, item) => {
    return (total += item.price);
  }, 0);

  return (
    <div className="grid lg:grid-cols-2 gap-12 text-sm">
      <div className="h-full w-full relative hidden lg:block">
        <Image
          src={PaymentSuccessImage}
          alt="Pyament success image"
          fill
          className="object-cover rounded-lg opacity-80"
          placeholder="blur"
        />
      </div>
      <div className="pt-5 flex flex-col">
        <h4 className="font-semibold text-primary">Order Success</h4>
        <h1 className="font-bold text-3xl mt-2">Thanks for ordering</h1>
        <div className="text-muted-foreground mt-1">
          Your order was processed and your assets are available to download
          below. <br /> We&apos;ve sent your recipt and order details to{" "}
          <span className="font-bold text-foreground">{user?.email}</span>
        </div>
        <p className="text-primary mt-16">Order No:</p>
        <p className="mt-1">{order.id}</p>
        <Separator className="my-4" />
        {order.orderItems.map(
          ({ id, name, category, blurDataUrl, fileUrl, image, price }) => (
            <CartItem
              key={id}
              name={name}
              price={price}
              category={category}
              image={image}
              blurDataUrl={blurDataUrl}
              className="p-0 hover:bg-transparent"
              fileUrl={fileUrl}
            />
          )
        )}
        <Separator className="my-3" />
        <InfoBlock label="Subtotal" value={total} className="mt-2" />
        <InfoBlock
          label="Transition Fee"
          value={transitionFee}
          className="mt-2"
        />
        <InfoBlock
          label="Total"
          className="font-bold mt-5"
          value={total + transitionFee}
        />
        <div className="flex items-center gap-12 mt-10">
          <div>
            <h5 className="font-medium">Shipping To</h5>
            {user?.email}
          </div>
          <div>
            <h5 className="font-medium">Order Status</h5>
            Payment successful
          </div>
        </div>
        <Separator className="mt-8" />
        <Link
          href="/products"
          className={cn(buttonVariants({ variant: "link" }), "group ml-auto")}
        >
          Continue shopping{" "}
          <FaArrowRightLong className="h-4 w-4 ml-2 group-hover:translate-x-2 transition duration-300" />{" "}
        </Link>
      </div>
    </div>
  );
};

export default Page;
