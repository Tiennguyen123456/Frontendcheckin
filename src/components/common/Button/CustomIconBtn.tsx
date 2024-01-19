import clsx from "clsx";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  type?: "primary" | "secondary";
  onClick?: () => void;
};

const CustomIconBtn = ({ children, className, type = "primary", onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        className,
        "h-9 w-9 rounded-full flex justify-center items-center",
        type === "primary"
          ? "bg-[rgba(0,0,0,0.87)] text-white"
          : "border-[rgba(0,0,0,0.87)] border-[1px] bg-white text-[rgba(0,0,0,0.87)]",
      )}
    >
      {children}
    </div>
  );
};

export default CustomIconBtn;
