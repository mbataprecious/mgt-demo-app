"use client";
import { Input } from "@/components/formControls/Input";
import PhoneNumberInput from "@/components/formControls/PhoneNumberInput";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { nanoid } from "nanoid";
import {
  CUSTOMER_KEY,
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/storage";
import { vehicleServiceData } from "@/utils/mock";
import { getCurrentFormattedDate } from "@/utils/helpers";
import ReminderSentModal from "@/components/ReminderSentModal";
import { useState } from "react";

const tableHeader = [
  "Name",
  "Email",
  "Phone Number",
  "Vehicle Make",
  "Vehicle Model",
  "Last Service Date",
  "Milage(KM)",
  "Due Date",
  "Status",
];
export default function Home() {
  const [open, setOpen] = useState(true);
  const route = useRouter();

  const defaultValues = {
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    vehicleMake: "",
    vehicleModel: "",
    plateNumber: "",
    address: "",
    mileage: 0,
  };
  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });

  const {
    formState: { errors },
  } = methods;
  const onSubmit = async (data: typeof defaultValues) => {
    try {
      const userId = nanoid();
      const allCustomers = getLocalStorageItem(
        CUSTOMER_KEY
      ) as typeof vehicleServiceData;
      const { firstName, lastName } = data;
      setLocalStorageItem(CUSTOMER_KEY, [
        {
          userId,
          lastServiceDate: "23/04/2024",
          dueDate: getCurrentFormattedDate(),
          name: `${firstName} ${lastName}`,
          ...data,
        },
        ...(allCustomers ?? []),
      ]);
      route.push("/customer/" + userId);
    } catch (err) {
      console.log("error ", err);
    }
  };
  console.log({ errors });
  return (
    <div className="bg-white rounded-lg">
      <div className=" p-6">
        <div>
          <h3 className=" text-[21px] font-semibold text-[#727891] mb-5">
            Add New Client
          </h3>
        </div>
        <div className="mt-10 mb-20">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className=" max-w-2xl"
            >
              <div className="flex space-x-5">
                <div className="w-full flex space-x-3">
                  <Input
                    type="text"
                    name="firstName"
                    label="First Name"
                    placeholder="Enter First Name"
                    required={true}
                  />
                  <Input
                    type="text"
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    required={true}
                  />
                </div>
                <div className="w-full">
                  <PhoneNumberInput
                    type="tel"
                    name="phoneNumber"
                    label="Client Phone Number"
                    placeholder="Enter text"
                    required={false}
                  />
                </div>
              </div>
              <div className="flex space-x-5">
                <div className="w-full">
                  <Input
                    type="email"
                    name="email"
                    label=" Client Email Address"
                    placeholder="Enter text"
                    required={true}
                  />
                </div>
                <div className="w-full">
                  <Input
                    type="text"
                    name="address"
                    label="  Client Home Address"
                    placeholder="Enter text"
                    required={true}
                  />
                </div>
              </div>

              <h3 className=" text-[21px] text-[#727891] text-semibold mt-8">
                {" "}
                Vehicle Details
              </h3>
              <div className="flex space-x-5">
                <div className="w-full">
                  <Input
                    type="text"
                    name="vehicleMake"
                    label="  Vehicle Make"
                    placeholder="Enter text Vehicle Make"
                    required={true}
                  />
                </div>
                <div className="w-full">
                  <Input
                    type="text"
                    name="vehicleModel"
                    label="  Vehicle Model"
                    placeholder="Enter text Vehicle Model"
                    required={true}
                  />
                </div>
              </div>
              <div className="flex space-x-5">
                <div className="w-full">
                  <Input
                    type="text"
                    name="mileage"
                    label=" Milage(Kilometre)"
                    placeholder="Enter Milage"
                    required={true}
                  />
                </div>
                <div className="w-full">
                  <Input
                    type="text"
                    name="plateNumber"
                    label=" License Plate Number"
                    placeholder="Enter License Plate Number"
                    required={true}
                  />
                </div>
              </div>
              <button
                type="submit"
                className=" px-6 p-3.5 mt-20 bg-[#000000] text-sm font-semibold text-white rounded-[6px] hover:bg-[#201f1f] border-0"
              >
                Create Customer Account{" "}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
      <ReminderSentModal open={open} setOpen={setOpen} />
    </div>
  );
}
