"use client";

import { Skeleton } from "../ui/skeleton";

interface ProductSkeletonsProps {
  count: number;
}

export const ProductSkeletons = ({ count }: ProductSkeletonsProps) => {
  return (
    <div className="grid gap-5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="dark:border rounded-md shadow_sm">
          <Skeleton className="w-full aspect-square" />
          <div className="p-3">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-12 h-5 mt-2" />
            <Skeleton className="w-10 h-5 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};