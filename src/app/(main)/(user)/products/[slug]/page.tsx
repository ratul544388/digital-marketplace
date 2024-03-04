import { getProductBySlug, getProducts } from "@/actions/products";
import { CategorySection } from "@/components/category-section";
import { ImageSlider } from "@/components/image-slider";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/constants";
import { ArrowRight, Check, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./_components/add-to-cart-button";

const Page = async ({ params }: { params: { slug: string } }) => {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const features = [
    "Instand Delivery",
    "Lifetime Download Link",
    "Full HD Quality",
  ];

  const products = await getProducts({
    category: product.category as (typeof categories)[number],
    take: 6,
  });

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Link href="/products">Products</Link>
        <ArrowRight className="h-3.5 w-3.5" />
        <h4 className="text-foreground line-clamp-1">{product.name}</h4>
      </div>
      <Separator />
      <section className="max-w-screen-lg w-full mx-auto grid sm:grid-cols-2 gap-8 items-center">
        <div className=" w-full">
          <h1 className="font-bold text-3xl">{product.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <h5 className="font-semibold">${product.price}</h5>
            <Separator orientation="vertical" className="h-5" />
            <p className="text-muted-foreground text-sm">{product.category}</p>
          </div>
          <div className="mt-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-sm text-muted-foreground flex items-center gap-3"
              >
                <Check className="text-green-500 h-4 w-4" />
                {feature}
              </div>
            ))}
          </div>
          <AddToCartButton product={product} />
          <div className="mt-3 text-muted-foreground flex items-center gap-2 justify-center">
            <Shield className="h-5 w-5" />
            30 days return gurantee
          </div>
        </div>
        <ImageSlider
          images={product.images}
          className="order-first sm:order-[initial] w-full sm:max-w-[400px] mr-auto"
        />
      </section>
      <section className="border rounded-lg shadow-md mt-20 p-5 space-y-3">
        <h3 className="text-2xl font-bold">About the Prouduct</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
          possimus sit obcaecati fugiat labore, nulla totam optio culpa quidem
          aperiam, sint iure a ex repudiandae? Rerum repellendus suscipit amet
          reiciendis ab unde tempora sapiente in minima vero provident, optio
          quasi quidem. Soluta quia itaque magni molestias consequuntur natus
          asperiores saepe.
        </p>
      </section>
      <CategorySection
        products={products}
        title="Similar Category"
        description="You may also like"
        shopAllUrl={`/products?category=${product.category}`}
        user={null}
      />
    </div>
  );
};

export default Page;
