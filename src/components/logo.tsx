"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  href?: string;
}

export const Logo = ({ className, href = "/" }: LogoProps) => {
  return (
    <Link href={href}>
      <Image src="/images/logo.svg" alt="Logo" width={32} height={32} />
    </Link>
  );
};
