"use client";
import React from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./formControls/Input";
import { Textarea } from "./formControls/Textarea";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function AddServiceModal({ open, setOpen }: Props) {
  const [errorOcurred, setErrorOcurred] = React.useState(false);
  const [notificationVisible, setNotificationVisible] = React.useState(false);

  const defaultValues = {
    name: "",
    email: "",
    serviceType: "",
    mileage: 10500,
    notes: "",
  };
  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });

  type DefaultValues = {
    name: string;
    email: string;
    serviceType: string;
    mileage: number;
    notes: string;
  };
  type DefaultValuesKeys = keyof DefaultValues;

  const onSubmit = async (data: DefaultValues) => {
    setErrorOcurred(false);
    //imported this from the customization you made on the contact form
    const shapedFormData = (Object.keys(data) as DefaultValuesKeys[]).map(
      (key) => {
        const value = data[key];
        return {
          objectTypeId: "0-1",
          name: key,
          value: value,
        };
      }
    );
    console.log(shapedFormData);
    try {
      //   const submission = await postHubSpotDemoForm(shapedFormData, formTarget);
      return setNotificationVisible(true);
    } catch (err) {
      console.error(err);
      setErrorOcurred(true);
    }
  };

  return (
    <>
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
                      <div className="flex justify-between">
                        <h3 className=" text-[21px] text-[#727891] font-semibold">
                          Add New Service
                        </h3>
                      </div>
                      <FormProvider {...methods}>
                        <form
                          method="post"
                          onSubmit={methods.handleSubmit(onSubmit)}
                        >
                          <div className="flex space-x-5">
                            <div className="w-full">
                              <Input
                                type="text"
                                name="name"
                                label="Client Name"
                                placeholder="Client Name"
                              />
                            </div>
                            <div className="w-full">
                              <Input
                                type="email"
                                name="email"
                                label="Client Email"
                                placeholder="Client Email"
                              />
                            </div>
                          </div>
                          <div className="flex space-x-5">
                            <div className="w-full">
                              <Input
                                type="text"
                                name="serviceType"
                                label="Service Type"
                                placeholder="Service Type"
                              />
                            </div>
                            <div className="w-full">
                              <Input
                                type="text"
                                name="milage"
                                label="Milage (KM)"
                                placeholder="Last Milage"
                              />
                            </div>
                          </div>
                          <div className="flex space-x-5">
                            <div className="w-full">
                              <Textarea
                                cols={5}
                                className=" h-[124px]"
                                name="notes"
                                label="Additional notes"
                                placeholder="Enter Notes"
                                required={true}
                              />
                            </div>
                            <div className="w-full"></div>
                          </div>

                          <button
                            type="submit"
                            className=" px-9 p-3 bg-[#000000] text-sm font-semibold text-white rounded-[6px] hover:bg-[#201f1f] border-0 mt-9"
                          >
                            Add New Service
                          </button>
                          {errorOcurred && (
                            <p className="text-center text-red-600 text-sm font-semibold">
                              An error occurred. Please try again
                            </p>
                          )}
                        </form>
                      </FormProvider>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
