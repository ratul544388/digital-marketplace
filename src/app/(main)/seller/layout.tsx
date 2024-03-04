import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function SellerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (user?.mode === "BUYER") {
    redirect("/");
  }

  return <>{children}</>;
}
