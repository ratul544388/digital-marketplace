"use client";
import { PiSpinnerBold } from "react-icons/pi";
export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <PiSpinnerBold className="h-9 w-9 animate-spin text-primary" />
    </div>
  );
};
