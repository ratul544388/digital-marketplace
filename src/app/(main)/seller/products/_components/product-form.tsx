"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import "@uploadthing/react/styles.css";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createProduct, updateProduct } from "@/actions/products";
import { FileUpload } from "@/components/file-upload";
import { ImageUpload } from "@/components/image-upload";
import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categories } from "@/constants";
import { ProductSchema } from "@/schemas";
import { productWithImages } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";

interface ProductFormProps {
  product?: productWithImages;
  title: string;
}

export const ProductForm = ({ product, title }: ProductFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      category: "",
      description: "",
      fileUrl: "",
      images: [],
      price: undefined,
    },
  });

  useEffect(() => {
    if (product) {
      const { name, slug, category, description, fileUrl, images, price } =
        product;
      form.reset({
        name,
        slug,
        category,
        description,
        fileUrl,
        images: images.map((image) => image.url),
        price,
      });
    }
  }, [form, product]);

  function onSubmit(values: z.infer<typeof ProductSchema>) {
    startTransition(() => {
      if (product) {
        updateProduct({ values, productId: product.id }).then(
          ({ success, error }) => {
            if (success) {
              toast.success(success);
              form.reset();
              router.push("/seller/products");
              router.refresh();
            } else {
              toast.error(error);
            }
          }
        );
      } else {
        createProduct(values).then(({ success, error }) => {
          if (success) {
            toast.success(success);
            form.reset();
            router.push("/seller/products");
            router.refresh();
          } else {
            toast.error(error);
          }
        });
      }
    });
  }
  return (
    <div className="flex flex-col gap-8 items-center rounded-lg shadow-md border p-6">
      <h1 className="font-semibold text-2xl text-muted-foreground">{title}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Digital Product Name"
                    disabled={isPending}
                    value={field.value}
                    onChange={(e) => {
                      form.setValue("name", e.target.value);
                      form.setValue(
                        "slug",
                        e.target.value.replace(/\s+/g, "-").toLowerCase()
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Product slug"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    disabled={isPending}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select category"
                    options={categories.slice(0, 2).map((item) => item)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($USD)</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="number"
                    placeholder="Price of your product in USD"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    endPoint="imageUpload"
                    images={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fileUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <FormControl>
                  <FileUpload
                    endPoint="fileUpload"
                    file={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            size="lg"
            type="submit"
            className="md:col-span-2 ml-auto"
          >
            {product ? "Save" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
