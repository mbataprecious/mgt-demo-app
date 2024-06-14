"use client";
import React, { useState } from "react";
import AddServiceModal from "./AddServiceModal";

const AddServicePartial = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className=" mt-12">
        <button
          type="button"
          onClick={()=>setOpen(x=>!x)}
          className=" px-9 p-3 bg-[#000000] text-sm font-semibold text-white rounded-[6px] hover:bg-[#201f1f] border-0"
        >
          Add New Service
        </button>
      </div>
      <AddServiceModal open={open} setOpen={setOpen} />
    </>
  );
};

export default AddServicePartial;
