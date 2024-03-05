"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import Stripe from "stripe";

export async function getOrders({
  userId,
  myOrders,
}: { userId?: string; myOrders?: boolean } = {}) {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const orders = await db.order.findMany({
    where: {
      ...(myOrders
        ? {
            userId: user.id,
          }
        : {}),
    },
    include: {
      orderItems: {
        include: {
          seller: true,
        },
      },
    },
  });

  return orders;
}

export async function checkout({ orderId }: { orderId?: string } = {}) {
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

    const orderItems = products.map((product) => {
      const { name, slug, category, images, price, fileUrl, sellerId } =
        product;
      return {
        name,
        slug,
        category,
        image: images[0].url,
        blurDataUrl: images[0].blurDataUrl,
        price,
        fileUrl,
        sellerId,
      };
    });

    let order;
    if (orderId) {
      order = await db.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          orderItems: true,
        },
      });
    } else {
      order = await db.order.create({
        data: {
          userId: user.id,
          orderItems: {
            createMany: {
              data: orderItems,
            },
          },
        },
        include: {
          orderItems: true,
        },
      });
    }

    if (!order) {
      return { error: "Order not found" };
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      order.orderItems.map((product) => ({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: Math.floor(product.price * 100),
        },
      }));

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.email as string,
      });
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: absoluteUrl(`/checkout/${order.id}?status=success`),
      cancel_url: absoluteUrl("/"),
      metadata: {
        orderId: order.id,
        userId: user.id,
      },
    });

    return { url: session.url };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
