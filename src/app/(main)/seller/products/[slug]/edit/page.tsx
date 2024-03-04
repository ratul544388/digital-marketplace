import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductForm } from "../../_components/product-form";

const EditProductPage = async ({ params }: { params: { slug: string } }) => {
  const product = await db.product.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
        images: true,
    }
  });

  if (!product) {
    notFound();
  }

  return <ProductForm title="Edit Product" product={product} />;
};

export default EditProductPage;
