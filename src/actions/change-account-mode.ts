"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { Mode } from "@prisma/client";

export async function changeAccountMode() {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return { error: "Unauthenticated" };
    }

    const mode: Mode = user.mode === "SELLER" ? "BUYER" : "SELLER";

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        mode,
      },
    });

    return { success: true, mode };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
