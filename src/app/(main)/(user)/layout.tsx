import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function BuyerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (user?.mode === "SELLER") {
    redirect("/seller/dashboard");
  }

  return <>{children}</>;
}
