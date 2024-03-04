"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export const getCart = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthenticated" };
    }

    const products = await db.product.findMany({
      where: {
        id: {
          in: user.cart,
        },
      },
      include: {
        images: true,
      },
    });

    return { cart: products };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const cartAction = async (productId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthenticated" };
    }

    const newCart = user.cart.includes(productId)
      ? user.cart.filter((id) => id !== productId)
      : [productId, ...user.cart];

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        cart: newCart,
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
