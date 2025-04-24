"use client";

import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import Link from "next/link";
import ArrowRightIcon from "@/components/icon/arrow-right";
import TypographyUtils from "@/utils/typography";

const CoreBreadcrumb = () => {
  const path = usePathname();
  const paths = path.split("/");

  const items = useMemo(
    () =>
      paths.map((path, i) => {
        if (path === "edit" || path === "create" || path === "detail") {
          return {
            title: TypographyUtils.capitalize(path),
          };
        }

        if (i === 0)
          return {
            title: (
              <Link className="!text-primary" href="/">
                Beranda
              </Link>
            ),
          };

        if (i === paths.length - 1) {
          return {
            title: TypographyUtils.capitalize(path.split("-").join(" ")),
          };
        }

        return {
          title: (
            <Link className="!text-primary" href={"/" + path}>
              {TypographyUtils.capitalize(path.split("-").join(" "))}
            </Link>
          ),
        };
      }),
    [paths],
  );

  return <Breadcrumb separator={<ArrowRightIcon />} items={items} />;
};

export default CoreBreadcrumb;
