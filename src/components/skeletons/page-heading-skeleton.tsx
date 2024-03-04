"use client";

import { Skeleton } from "../ui/skeleton";

interface PageHeadingSkeletonProps {
  action?: boolean;
}

export const PageHeadingSkeleton = ({ action }: PageHeadingSkeletonProps) => {
  return (
    <div className="flex justify-between">
      <Skeleton className="h-9 w-[120px]" />
      {action && <Skeleton className="h-9 w-[100px]" />}
    </div>
  );
};
