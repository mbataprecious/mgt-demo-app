"use client";
import React from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ReminderSentModal = ({ open, setOpen }: Props) => {
  return (
    <Transition show={open}>
      <Dialog className="relative z-30" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-2 px-6 sm:w-full sm:max-w-xl">
                <div className="mx-auto">
                  <div className=" mx-auto pt-8 md:px-4 mb-14">
                    <div className="flex justify-between py-[100px] px-[20px]">
                      <h3 className=" text-[21px] text-[#727891] text-center font-semibold">
                        Service remindar notification has been sent to client
                      </h3>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReminderSentModal;
