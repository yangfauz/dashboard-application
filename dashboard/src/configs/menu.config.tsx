import { ROUTES } from "./route.config";
import React from "react";
import { ModuleNameEnum } from "./module.config";
import HomeIcon from "../components/icon/home";
import { UserOutlined } from "@ant-design/icons";

interface IMenuConfig {
  key: string;
  icon?: React.ReactNode;
  label: string;
  module?: ModuleNameEnum;
  subMenu?: Omit<IMenuConfig, "subMenu">[];
}

export const MENU_CONFIG: IMenuConfig[] = [
  {
    key: ROUTES.DEFAULT,
    icon: <HomeIcon />,
    label: "Dashboard",
    module: ModuleNameEnum.Dasboard,
  },
  {
    key: ROUTES.CUSTOMER.LIST,
    icon: <UserOutlined />,
    label: "Customer",
    module: ModuleNameEnum.Customer,
  },
];
