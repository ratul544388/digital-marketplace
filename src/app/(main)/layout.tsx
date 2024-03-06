import { Footer } from "@/components/footer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <MaxWidthWrapper className="min-h-screen pb-40">{children}</MaxWidthWrapper>
      <Footer/>
    </div>
  );
}
