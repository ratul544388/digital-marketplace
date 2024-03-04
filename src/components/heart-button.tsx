"use client";
import { favorites } from "@/actions/favorites";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

export const HeartButton = ({
  className,
  initialFavorite,
  productId,
}: {
  className?: string;
  initialFavorite: boolean;
  productId: string;
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const animate = isFavorite ? "liked" : "unliked";

  const [_, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const previousFavorite = isFavorite;
    setIsFavorite(!isFavorite);
    startTransition(() => {
      favorites(productId).then(({ error, success }) => {
        if (error) {
          toast.error(error);
          setIsFavorite(previousFavorite);
        }
      });
    });
  };

  return (
    <motion.div
      onClick={handleClick}
      className={cn("cursor-pointer bg-background relative p-2 rounded-full z-30", className)}
    >
      {isFavorite ? (
        <FaHeart className="w-[28px] h-[28px] text-rose-500" />
      ) : (
        <FaRegHeart className="w-[28px] h-[28px] text-gray-400" />
      )}
      <motion.div
        variants={{
          liked: { opacity: [1, 0], scale: [1, 2] },
          unliked: { scale: 1, opacity: 0 },
        }}
        transition={{ duration: 0.5 }}
        initial={isFavorite ? "liked" : "unliked"}
        animate={animate}
        className="absolute inset-0 -z-10"
      >
        <FaHeart className="w-[28px] h-[28px] text-rose-500" />
      </motion.div>
    </motion.div>
  );
};
