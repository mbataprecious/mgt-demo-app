"use client";
import { vehicleServiceData } from "@/utils/mock";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";
import {
  CUSTOMER_KEY,
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/storage";
import { sendEmail, sendSms} from "./server";

import { toast } from 'react-hot-toast';
import ReminderSentModal from "@/components/ReminderSentModal";

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
  const mounted = useRef(true);
  const [open, setOpen] = useState(false);
  const [customerList, setCustomerList] = useState<typeof vehicleServiceData>(
    []
  );
  useEffect(() => {
    if (mounted.current) {
      const data = getLocalStorageItem(
        CUSTOMER_KEY
      ) as typeof vehicleServiceData;
      if (!data) {
        setLocalStorageItem(CUSTOMER_KEY, vehicleServiceData);
        setCustomerList(vehicleServiceData);
      } else {
        setCustomerList(data);
      }
    }
    mounted.current = false;
  }, []);
  const router = useRouter();

  const handleDueMessage = async (userString: string) => {
    const toastId = toast.loading("Sending message...");
    const user = JSON.parse(userString);
    const { name, email, phoneNumber } = user;
    const cleanPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");
    const message = `Hi ${name}, your vehicle service is due. Please contact us to schedule an appointment.`;
    try{
        await sendSms(cleanPhoneNumber, message);
        await sendEmail(email, message);
        toast.success(`${name} has been notified.`, { id: toastId });
        setOpen(true)
    }
    catch(error){
        toast.error(`Failed to notify ${name}.`, { id: toastId });
    }
}

  return (
    <div className="bg-white rounded-lg">
      <div className=" p-6">
        <div className="flex justify-between">
          <h3 className=" text-[21px] text-[#727891] ">Customer Logs</h3>
          <Link href={"/customer/add"}>
            <button
              type="button"
              className=" px-6 p-3.5 bg-[#000000] text-sm font-semibold text-white rounded-[6px] hover:bg-[#201f1f] border-0"
            >
              Add Customer
            </button>
          </Link>
        </div>
        <table className="w-full text-xs text-left text-[#727891] mt-7">
          <thead className="text-xs text-[#C2C5D1] capitalize border-b border-[#E0E2E8]">
            <tr>
              {tableHeader.map((header, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className="text-[0.75rem] py-3 font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customerList?.map(
              (
                {
                  userId,
                  name,
                  email,
                  phoneNumber,
                  vehicleMake,
                  vehicleModel,
                  lastServiceDate,
                  mileage,
                  dueDate,
                },
                index
              ) => {
                // console.log(index)
                return (
                  <tr
                    key={index}
                    onClick={() => {
                      const currentUser = JSON.parse(getCookie("user") ?? "{}");
                      console.log("currentUser", currentUser);
                      const userString = JSON.stringify(
                        vehicleServiceData[index]
                      );
                      if (currentUser?.name !== name) {
                        deleteCookie("service");
                        deleteCookie("user");
                      } else {
                      }
                      setCookie("user", userString);
                      console.log("data to be sent", userString);
                      router.push(`/customer/${userId}`);
                    }}
                    className="bg-white relative hover:bg-gray-50 cursor-pointer border-b"
                  >
                    <td className="capitalize py-4 font-medium whitespace-nowrap">
                      {name}
                    </td>
                    <td className="py-4 font-medium">{email}</td>
                    <td className="py-4">{phoneNumber}</td>
                    <td className="py-4">{vehicleMake}</td>
                    <td className="py-4">{vehicleModel}</td>
                    <td className="py-4">{lastServiceDate}</td>
                    <td className="py-4">{mileage}</td>
                    <td className="py-4">{dueDate}</td>
                    <td className="py-4">
                      <button

                        type="button"
                        disabled={index % 3 === 1}
                        className={
                          " px-6 p-3.5 text-sm font-semibold  rounded-[6px]  border-0" +
                          (index % 3 === 1
                            ? " bg-[#FFE2E2] hover:bg-[#FFE2E2] text-[#6D6D6D]"
                            : " bg-[#FE3131] hover:bg-[#bd2626] text-white")
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            const userString = JSON.stringify(
                              vehicleServiceData[index]
                            );
                            setCookie("user", userString);
                            console.log("data to be sent", userString);
                            handleDueMessage(userString);
                        }}
                      >
                        Due Now
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        {
          !customerList.length && <div className=" h-[500px]"></div>
        }
      </div>
      <ReminderSentModal open={open} setOpen={setOpen} />
    </div>
  );
}
