"use client";
import { sendSms } from "./server";
import {useState} from "react";

export function ViewProfileButton () {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await sendSms();
        setLoading(false);
    }
    return (
    <button
      type="button"
      className=" px-6 p-3.5 bg-[#FE3131] text-sm font-semibold text-white rounded-[6px] hover:bg-[#bd2626] border-0"
      onClick={handleClick}
    >
      {
        loading ? "Sending..." : "View Profile"
      }
    </button>
  );
}