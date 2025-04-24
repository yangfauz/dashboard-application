"use client";

import { Avatar, Popover, Skeleton } from "antd";
import Image from "next/image";
import React from "react";
import LogoutIcon from "@/components/icon/logout";
import { signOut, useSession } from "next-auth/react";

const HeaderInfo: React.FC = () => {
  const { data, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const userContent = (
    <div className="max-w-[280px]">
      <figure className="flex py-5 px-[25px] rounded-lg bg-gray-normal mb-3">
        {isAuthenticated && (
          <Image
            unoptimized
            className="mr-[15px]"
            width={46}
            height={46}
            src={"/profile-default.png"}
            alt=""
          />
        )}
        {isLoading && (
          <Skeleton.Avatar style={{ width: 46, height: 46, marginRight: 15 }} />
        )}
        <figcaption>
          {isAuthenticated && (
              <h5 className="text-sm font-semibold leading-6 text-dark">
                {data?.user.full_name}
              </h5>
             
          )}
          {isLoading && (
            <>
              <Skeleton.Input style={{ width: 70, height: 16 }} />
              <Skeleton.Input style={{ width: 36, height: 16, marginTop: 8 }} />
            </>
          )}
        </figcaption>
      </figure>
      <div
        className="inline-flex items-center justify-center text-[13px] font-medium relative w-[calc(100%+30px)] h-[calc(100% + 15px)] py-[15px] px-0 cursor-pointer bg-gray-normal left-[-15px] right-[-15px] bottom-[-15px] text-gray hover:text-primary-hover"
        onClick={() => signOut()}
      >
        <LogoutIcon className="w-[15px] h-[15px] mr-2" /> Sign Out
      </div>
    </div>
  );
  return (
    <div className="flex items-center py-4">
      <div>
        {isLoading && <Skeleton.Avatar style={{ width: 32, height: 32 }} />}
        {isAuthenticated && (
          <Popover
            placement="bottomRight"
            content={userContent}
            trigger={"click"}
          >
              <Avatar src={"/profile-default.png"} />
          </Popover>
        )}
      </div>
    </div>
  );
};

export default HeaderInfo;
