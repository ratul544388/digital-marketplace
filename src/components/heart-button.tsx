"use client";
import { favorites } from "@/actions/favorites";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [_, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSignedIn) {
      return router.push("/sign-in");
    }
    const previousFavorite = isFavorite;
    setIsFavorite(!isFavorite);
    startTransition(() => {
      favorites(productId).then(({ error }) => {
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
      className={cn(
        "cursor-pointer bg-background relative p-2 rounded-full z-30",
        className
      )}
    >
      {isFavorite ? (
        <FaHeart className="w-[20px] h-[20px] text-rose-500" />
      ) : (
        <FaRegHeart className="w-[20px] h-[20px] text-gray-400" />
      )}
      <motion.div
        variants={{
          liked: { opacity: [1, 0], scale: [1, 3] },
          unliked: { scale: 1, opacity: 0 },
        }}
        transition={{ duration: 0.5 }}
        initial={isFavorite ? "liked" : "unliked"}
        animate={animate}
        className="absolute inset-0 flex items-center justify-center -z-10"
      >
        <FaHeart className="w-[20px] h-[20px] text-rose-500" />
      </motion.div>
    </motion.div>
  );
};
