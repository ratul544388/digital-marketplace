"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export async function favorites(productId: string) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return { error: "Unauthenticated" };
    }

    const favorites = user.favorites.includes(productId)
      ? user.favorites.filter((item) => item !== productId)
      : [productId, ...user.favorites];

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorites,
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
