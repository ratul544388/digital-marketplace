"use server";

import { categories } from "@/constants";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import getBlurDataUrl from "@/lib/get-blur-data-url";
import { ProductSchema } from "@/schemas";
import { endOfDay, startOfDay, subMonths } from "date-fns";
import * as z from "zod";

export async function getProductBySlug(slug: string) {
  const product = await db.product.findUnique({
    where: {
      slug,
    },
    include: {
      images: true,
    },
  });

  return product;
}

export async function getProducts({
  category,
  favorites,
  take = 12,
}: {
  category?: (typeof categories)[number];
  favorites?: string[];
  take?: number;
} = {}) {
  const startDate = startOfDay(subMonths(new Date(), 1));
  const endDate = endOfDay(new Date());
  const products = await db.product.findMany({
    where: {
      ...(category === "brand new"
        ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
        : category
        ? {
            category: {
              equals: category,
              mode: "insensitive",
            },
          }
        : favorites
        ? {
            id: {
              in: favorites,
            },
          }
        : {}),
    },
    include: {
      images: true,
    },
    take,
  });

  return products;
}

export async function createProduct(values: z.infer<typeof ProductSchema>) {
  try {
    const validatedFields = ProductSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const user = await currentUser();

    if (!user?.id) {
      return { error: "Unauthenticated" };
    }

    const images = await Promise.all(
      values.images.map(async (url) => {
        const blurDataUrl = (await getBlurDataUrl(url)) as string;
        return {
          url,
          blurDataUrl,
        };
      })
    );

    await db.product.create({
      data: {
        ...values,
        images: {
          createMany: {
            data: images,
          },
        },
        sellerId: user.id,
      },
    });

    return { success: "Product created successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function updateProduct({
  values,
  productId,
}: {
  values: z.infer<typeof ProductSchema>;
  productId: string;
}) {
  try {
    const validatedFields = ProductSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const user = await currentUser();

    if (!user?.id) {
      return { error: "Unauthenticated" };
    }

    const images = await Promise.all(
      values.images.map(async (url) => {
        const blurDataUrl = (await getBlurDataUrl(url)) as string;
        return {
          url,
          blurDataUrl,
        };
      })
    );

    const product = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...values,
        images: {
          deleteMany: {
            productId,
          },
          createMany: {
            data: images,
          },
        },
      },
    });

    return { success: "Product was updated", slug: product.slug };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return { error: "Unauthenticated" };
    }

    await db.product.delete({
      where: {
        id: productId,
      },
    });

    return { success: "Product was deleted" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
