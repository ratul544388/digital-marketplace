import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ReactNode } from "react";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <MaxWidthWrapper>{children}</MaxWidthWrapper>;
}
