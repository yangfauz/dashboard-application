"use client";

import { Badge, Popover, Typography } from "antd";
import Link from "next/link";
import React from "react";
import BellIcon from "@/components/icon/bell";
import { COLORS } from "../../../tailwind.config";
import NotificationItem, {
  NotificationItemProps,
} from "./components/notification-item";

const MOCK_DATA: NotificationItemProps[] = [
  {
    messages: "You have new order !",
    time: 1,
  },
  {
    messages: "Order #PO002192 has been completed",
    time: 2,
  },
  {
    messages: "Order #P002393 has been picked up",
    time: 3,
  },
  {
    messages: "Order #P002393 has been picked up",
    time: 4,
  },
];

const Notification: React.FC = () => {
  const notificationContent = (
    <div className="w-[370px]">
      <div className="flex justify-center gap-x-2 items-center py-5 px-[25px] rounded-lg bg-gray-normal mb-3">
        <Typography.Title className="!mb-0" level={5}>
          Notifications
        </Typography.Title>
        <Badge status="success" color={COLORS.success.DEFAULT} count={3} />
      </div>
      <ul className="overflow-y-auto overflow-x-hidden sider-scroll max-h-[200px]">
        {MOCK_DATA.map((data, index) => (
          <li key={index}>
            <NotificationItem messages={data.messages} time={data.time} />
          </li>
        ))}
      </ul>
      <div
        className="inline-flex items-center justify-center text-[13px] font-medium relative w-[calc(100%+30px)] h-[calc(100% + 15px)] py-[15px] px-0 cursor-pointer bg-white left-[-15px] right-[-15px] bottom-[-15px] text-primary hover:bg-primary-hover hover:bg-opacity-[0.063]"
        // onClick={() => signOut()}
      >
        See all notifications
      </div>
    </div>
  );
  return (
    <div className="flex items-center py-4">
      <div>
        <Popover
          placement="bottomLeft"
          content={notificationContent}
          trigger={"click"}
        >
          <Badge dot offset={[-8, -5]}>
            <Link
              href="#"
              className="shadow-none text-black  hover:text-black px-2 !w-5 !h-5"
            >
              <BellIcon
                className="!text-[20px] !w-5 !h-5"
                height={20}
                width={20}
              />
            </Link>
          </Badge>
        </Popover>
      </div>
    </div>
  );
};

export default Notification;
