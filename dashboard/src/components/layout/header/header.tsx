import React from "react";
import CollapsedTrigger from "./collapse-trigger";
import Image from "next/image";
import HeaderInfo from "./header-info";

const Header: React.FC = () => {
  return (
    <header className="w-full fixed top-0 bg-white flex items-center justify-between h-[64px] max-h-[64px] px-[15px] z-50 shadow-[0px_2px_30px_rgba(146,153,184,0.063)]">
      <div className="flex gap-x-[25px]">
        <CollapsedTrigger />
        <Image
          src="/dashboard-logo.webp"
          width={41.17}
          height={28}
          alt="logo"
          style={{
            cursor: "pointer",
            height: "auto",
          }}
        />
      </div>
      <div className="flex gap-x-4 items-center">
        <HeaderInfo />
      </div>
    </header>
  );
};

export default Header;
