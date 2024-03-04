import { productWithImages } from "@/types";
import { User } from "@prisma/client";
import { ProductCard } from "./product-card";

interface ProductsProps {
  products: productWithImages[];
  user: User | null;
}

export const Products = ({ products, user }: ProductsProps) => {
  return (
    <div className="grid gap-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} user={user} />
      ))}
    </div>
  );
};
