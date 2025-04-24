"use client";

import React from "react";
import AppLayoutStore from "@/store/app-layout";
import { cn } from "@/utils/cn";

interface ContentLayoutProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentLayoutProps> = ({ children }) => {
  const isCollapsed = AppLayoutStore((state) => state);

  return (
    <main
      className={cn(
        "w-full block min-h-0 p-5 overflow-y-auto overflow-x-hidden mt-[64px] flex-auto transition-all duration-300",
        isCollapsed ? "ml-[80px]" : "ml-[280px]",
      )}
    >
      {children}
    </main>
  );
};

export default Content;
