"use client";
import { Fragment } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
interface Props {
  current: string;
}
const NavigationBar = ({ current }: Props) => {


  return (
    <Disclosure as="nav" className=" bg-white rounded-lg">
      {({ open }) => (
        <>
          <div className=" mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-[5.625rem]">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex-1 flex items-center justify-between sm:items-stretch sm:justify-start">
                <div className=" pl-16 md:pl-0 flex-shrink-0 flex items-center">
                  <div className="w-auto block sm:hidden relative ">
                    <input
                      className=" py-[.45rem] px-2 w-[11rem] bg-[#fafbfc] border border-[#DFE1E6] rounded active:border-blue-300 outline-blue-300 outline-[.7rem]"
                      type="search"
                      placeholder="Search"
                    />
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute right-[1rem] top-[.8rem]" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="flex">
                    <div className="relative">
                      <input
                        className="md:w-[12rem] py-[.45rem] px-2 pr-7 w-full bg-[#fafbfc] border border-[#DFE1E6] rounded active:border-blue-300 outline-blue-300 outline-[.7rem]"
                        type="search"
                        placeholder="Search"
                      />
                      <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute right-2 top-[.75rem]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                <button
                  type="button"
                  className="hidden md:block p-1 rounded-full hover:text-[#727891] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative z-10">
                  <div>
                    {/* <Menu.Button className=" w-[30px] h-[30px] items-center justify-center flex text-sm rounded-full focus:outline-none ring-2 ring-white ring-offset-2 ring-offset-amber-600 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"> */}
                    <MenuButton className=" flex text-center items-center">
                      <span className="sr-only">Open user menu</span>
                      <div className=" border border-secondary flex justify-center items-center rounded-full w-[30px] h-[30px]">
                      <Image
                        className="rounded-full block m-auto"
                        src="/Assets/avatar.png"
                        alt=""
                        width={24}
                        height={24}
                      />

                      </div>

                      <span className="hidden md:block mx-3 text-xs leading-[1.125rem] text-[#727891]  mr-16">
                        Admin 1
                      </span>
                    </MenuButton>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ focus:active }) => (
                          <Link
                            href="/profile/settings"
                            className={`
                             ${active ? "bg-gray-100" : ""}
                              " block px-4 py-2 text-sm text-gray-700 "
                           `}
                          >
                            Settings
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus:active }) => (
                          <button
                            className={`
                             ${active ? "bg-gray-100" : ""}
                              " block px-4 py-2 text-sm text-gray-700 "
                           `}
                          >
                            Sign out
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <DisclosureButton
                as="a"
                className={"block px-3 py-2 rounded-md text-base font-medium"}
              >
                {current} check
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};
export default NavigationBar;
