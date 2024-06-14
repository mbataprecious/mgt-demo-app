import { vehicleServiceData } from "@/utils/mock";
import Link from "next/link";

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
            {vehicleServiceData?.map(
              (
                {
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
                return (
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-50 cursor-pointer border-b"
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
                        className=" px-6 p-3.5 bg-[#FE3131] text-sm font-semibold text-white rounded-[6px] hover:bg-[#bd2626] border-0"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
