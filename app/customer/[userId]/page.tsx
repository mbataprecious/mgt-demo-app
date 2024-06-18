"use client";
import AddServiceModal from "@/components/AddServiceModal";
import { serviceData, vehicleServiceData } from "@/utils/mock";
import {
  CUSTOMER_KEY,
  SERVICES_KEY,
  getLocalStorageItem,
} from "@/utils/storage";
import { useEffect, useRef, useState } from "react";

const tableHeader = [
  "Service Type",
  "Service Date",
  "Milage (KM)",
  "Last Service date",
  "Attendants Name",
  "Additional Notes",
];

export default function CustomerDetails({
  params,
}: {
  params: { userId: string };
}) {
  const mounted = useRef(true);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<(typeof vehicleServiceData)[0]>();
  const [services, setServices] = useState<IServicesMap[string]>([]);
  useEffect(() => {
    if (mounted.current) {
      const data = getLocalStorageItem(
        CUSTOMER_KEY
      ) as typeof vehicleServiceData;
      const userData = data.find(({ userId }) => userId === params.userId)!;
      setDetails(userData);

      const servicesMap = getLocalStorageItem(SERVICES_KEY) as IServicesMap;
      const currentUserList = servicesMap?.[userData.userId];
      setServices(currentUserList ?? []);
    }
    mounted.current = false;
  }, []);

  const titleMap = {
    name: "Name",
    email: "Email",
    phoneNumber: "Phone Number",
    vehicleMake: "Vehicle Make",
    vehicleModel: "Vehicle Model",
    lastServiceDate: "12/02/2024",
    plateNumber: "License Plate",
  };

  const fistList = ["name", "email", "phoneNumber"];
  const secondList = ["vehicleMake", "vehicleModel", "plateNumber"];
  return (
    <div className="">
      <div className=" p-6 bg-white rounded-lg">
        <div className="flex justify-between">
          <h3 className=" text-[21px] text-[#727891] ">Customer Details</h3>
        </div>

        <div className=" grid grid-cols-3 max-w-2xl">
          {fistList.map((val) => (
            <div className=" pb-6" key={val}>
              <h4 className=" text-xs text-[#727891] my-4">
                {titleMap[val as keyof typeof titleMap]}
              </h4>

              <h3 className="font-semibold text-[#727891]">
                {details?.[val as keyof typeof details]}
              </h3>
            </div>
          ))}
        </div>
        <div className=" grid grid-cols-3 max-w-2xl border-t border-t-[#E0E2E8]">
          {secondList.map((val) => (
            <div className=" pb-6" key={val}>
              <h4 className=" text-xs text-[#727891] my-4">
                {titleMap[val as keyof typeof titleMap]}
              </h4>

              <h3 className="font-semibold text-[#727891]">
                {details?.[val as keyof typeof details]}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className=" p-6 bg-white rounded-lg mt-5">
        <div className="flex justify-between">
          <h3 className=" text-[21px] text-[#727891] ">Service History</h3>
        </div>
        <table className="w-full text-xs text-left text-[#727891] mt-3">
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
            {services?.map(
              (
                {
                  serviceType,
                  serviceDate,
                  mileage,
                  lastServiceDate,
                  attendantsName,
                  additionalNotes,
                },
                index
              ) => {
                return (
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-50 cursor-pointer border-b border-b-[#F5F5F5]"
                  >
                    <td className="capitalize py-2 font-medium whitespace-nowrap">
                      {serviceType}
                    </td>
                    <td className="py-2 font-medium">{serviceDate}</td>

                    <td className="py-2">{mileage}</td>
                    <td className="py-2">{lastServiceDate}</td>
                    <td className="py-2">{attendantsName}</td>
                    <td className="py-2">{additionalNotes}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        <div className=" mt-12">
          <button
            type="button"
            onClick={() => setOpen((x) => !x)}
            className=" px-9 p-3 bg-[#000000] text-sm font-semibold text-white rounded-[6px] hover:bg-[#201f1f] border-0"
          >
            Add New Service
          </button>
        </div>
        <AddServiceModal
          open={open}
          setOpen={setOpen}
          details={details!}
          addService={(data) => {
            setServices((prevServices) => {
              return [data, ...prevServices];
            });
          }}
        />
      </div>
    </div>
  );
}
