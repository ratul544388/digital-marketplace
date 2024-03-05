import { getOrders } from "@/actions/orders";
import { CartItem } from "@/components/cart-item";
import { PageHeading } from "@/components/page-heading";
import { Separator } from "@/components/ui/separator";

const MyPurchasesPage = async () => {
  const orders = await getOrders({ myOrders: true });
  return (
    <div className="flex max-w-[900px] mx-auto flex-col gap-4 h-full">
      <PageHeading>My Purchases</PageHeading>
      <Separator />
      <section className="space-y-5 text-sm">
        {orders?.map((order) => (
          <div
            key={order.id}
            className="bg-secondary/30 py-3 rounded-lg shadow-md border"
          >
            <h5 className="text-primary font-medium px-3">Order no</h5>
            <p className="text-muted-foreground font-medium px-3 mb-3">
              {order.id}
            </p>
            <div className="w-full space-y-3">
              {order.orderItems.map(
                ({
                  id,
                  name,
                  slug,
                  category,
                  image,
                  blurDataUrl,
                  price,
                  fileUrl,
                  seller,
                }) => (
                  <CartItem
                    key={id}
                    name={name}
                    category={category}
                    price={price}
                    slug={slug}
                    image={image}
                    blurDataUrl={blurDataUrl}
                    seller={seller}
                    className="bg-secondary"
                    fileUrl={fileUrl}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MyPurchasesPage;
