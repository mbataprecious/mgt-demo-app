"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

interface Props {
  menuItems: {
    name: string;
    pathName: string;
    icons: string;
    id: number;
  }[];
}
const SideBar = ({ menuItems }: Props) => {
  const pathname = usePathname();
  return (
    <div className=" absolute">
      <div className="hidden fixed h-screen sm:block w-[12.663rem] bg-[#000]">
        <div className="py-16 pl-8 pr-16 flex justify-start items-center h-28">
          <Link href={"/"}>
            <Image
              src={"/Assets/mgt-logo.svg"}
              alt="logo"
              width={88.17}
              height={24}
            />
          </Link>
        </div>
        <div className="mt-5 flex flex-col justify-between h-[70%]">
          <div>
            {menuItems?.map((item) =>
              item.pathName === "/" ? (
                <Link
                  key={item.id}
                  href={item.pathName}
                  className={
                    pathname === "/"
                      ? "border-l-4 bg-[#ffffff3a] block text-sm py-3 text-[#ffffff]"
                      : " hover:border-l-4 hover:bg-[#ffffff3a] block text-sm py-3 text-[#ffffff] "
                  }
                >
                  <img
                    src={item.icons}
                    alt={`${item.name} icon`}
                    className=" h-6 w-6 inline ml-6 mr-4"
                  />
                  <span className="">{item.name}</span>
                </Link>
              ) : (
                <Link
                  key={item.id}
                  href={item.pathName}
                  className={
                    pathname.startsWith(item.pathName)
                      ? "border-l-4 bg-[#ffffff3a] block text-sm py-3 text-[#ffffff]"
                      : " hover:border-l-4 hover:bg-[#ffffff3a] block text-sm py-3 text-[#ffffff] "
                  }
                >
                  <img
                    src={item.icons}
                    alt={`${item.name} icon`}
                    className=" h-6 w-6 inline ml-6 mr-4"
                  />
                  <span className="">{item.name}</span>
                </Link>
              )
            )}
          </div>
          <div className="">
            <Link
              href="/"
              className={
                pathname.startsWith("/profile")
                  ? "border-l-4 bg-[#ffffff3a] block text-sm py-3 text-[#ffffff]"
                  : " hover:border-l-4 hover:bg-[#ffffff3a] block text-sm py-3 text-[#ffffff] "
              }
            >
              <img
                src={"/Assets/setting.svg"}
                alt="setting_icon"
                className=" h-6 w-6 inline ml-6 mr-4"
              />
              <span className="">Settings</span>
            </Link>
            <button className="hover:border-l-4 hover:bg-[#ffffff3a] flex text-sm py-3 text-[#ffffff] w-full">
              <img
                src={"/Assets/logout.svg"}
                alt="log out"
                className=" h-6 w-6 inline ml-6 mr-4"
              />
              <span className="">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
