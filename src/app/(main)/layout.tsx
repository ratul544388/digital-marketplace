import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <MaxWidthWrapper className="min-h-screen pb-10">{children}</MaxWidthWrapper>
      <footer className="py-20 bg-gray-700">This is footer</footer>
    </div>
  );
}
