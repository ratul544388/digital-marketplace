"use server";
import { ReceiptEmailHtml } from "@/components/receipt-email";
import { Order, OrderItem } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (order: Order & { orderItems: OrderItem[] }) => {

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "ratulislam544388@gmail.com",
    subject: "Test email",
    react: ReceiptEmailHtml({
      email: "ratulislam544388@gmail.com",
      orderId: order.id,
      orderItems: order.orderItems,
    }),
  });

  return { success: "Email was sent" };
};
