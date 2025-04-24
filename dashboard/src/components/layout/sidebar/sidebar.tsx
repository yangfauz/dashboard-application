"use client";

import { ItemType, MenuItemType } from "antd/es/menu/interface";
import React, { useMemo } from "react";
import { Menu, Skeleton } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { MENU_CONFIG } from "@/configs/menu.config";
import Sider from "antd/es/layout/Sider";
import AppLayoutStore from "@/store/app-layout";
import { useSession } from "next-auth/react";
import { cn } from "@/utils/cn";

const Sidebar: React.FC = () => {
  const isCollapsed = AppLayoutStore((state) => state);
  const router = useRouter();
  const pathname = usePathname();


  const { status } = useSession();

  const isLoading = status === "loading";

  const selectedKey = useMemo(() => {
    if (pathname === "/") return "/";

    const paths = pathname.split("/");

    return `/${paths.slice(1, paths.length)[0]}`;
  }, [pathname]);


  const menuByPermission = (): ItemType<MenuItemType>[] => {
      const result = MENU_CONFIG.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
        children: item.subMenu?.map((sub) => ({
          key: sub.key,
          label: sub.label,
        })),
      }));

      return result;
  };

  return (
    <Sider
      trigger={null}
      className="sider-scroll h-screen overflow-y-auto !bg-white !fixed left-0 mt-[64px] z-30 p-[15px]"
      collapsible
      collapsed={isCollapsed}
      color="primary"
      width={280}
      collapsedWidth={80}
    >
      <div className="relative overflow-hidden w-full h-full">
        <div
          className={cn(
            "absolute inset-0 overflow-y-auto overflow-x-hidden sider-scroll",
            isCollapsed ? "mr-[-10px]" : "mr-[-5px]",
          )}
        >
          {isLoading && (
            <div className="flex flex-col gap-y-4">
              <Skeleton.Input style={{ width: "100%" }} />
              <Skeleton.Input style={{ width: "100%" }} />
              <Skeleton.Input style={{ width: "100%" }} />
              <Skeleton.Input style={{ width: "100%" }} />
              <Skeleton.Input style={{ width: "100%" }} />
              <Skeleton.Input style={{ width: "100%" }} />
            </div>
          )}
          {!isLoading && (
            <Menu
              className="p-0"
              // style={{
              //   padding: isCollapsed ? "20px 10px" : "20px",
              // }}
              mode="inline"
              defaultSelectedKeys={[selectedKey]}
              items={menuByPermission()}
              onClick={({ key }) => {
                router.push(key.toString());
              }}
              selectedKeys={[selectedKey]}
            />
          )}
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
