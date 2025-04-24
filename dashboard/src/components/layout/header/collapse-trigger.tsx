"use client";

import React from "react";
import AppLayoutStore from "@/store/app-layout";
import MenuRightIcon from "../../icon/menu-right";
import MenuLeftIcon from "../../icon/menu-left";

const CollapsedTrigger = () => {
  const isCollapsed = AppLayoutStore((state) => state);
  const toggleIsCollapsed = () => AppLayoutStore.setState((prev) => !prev);

  return (
    <div
      onClick={() => toggleIsCollapsed()}
      className="cursor-pointer pl-[15px]"
    >
      {isCollapsed ? <MenuRightIcon /> : <MenuLeftIcon />}
    </div>
  );
};

export default CollapsedTrigger;
