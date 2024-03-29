"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const Logo = ({ className, href = "/", onClick }: LogoProps) => {
  return (
    <Link href={href} onClick={onClick}>
      <Image src="/images/logo.svg" alt="Logo" width={32} height={32} />
    </Link>
  );
};
