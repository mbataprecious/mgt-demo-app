import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { getErrObject } from "../../utils/helpers";

interface Props {
  label?: string;
  miniLabel?: string;
  name: string;
  dontShowError?: boolean;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  placeholder?: string;
  onBlur?: () => void;
  topClass?: string;
  className?: string;
}
const Input = ({
  label,
  miniLabel,
  name,
  disabled,
  dontShowError,
  required,
  type,
  placeholder,
  onBlur,
  topClass,
  ...rest
}: Props) => {
  const { formState, register } = useFormContext();
  const [open, setOpen] = useState(false);
  const fieldType = type ? type : "text";

  return (
    <div className="relative control ">
      {label && (
        <label className="label" htmlFor={name}>
          {label}{" "}
          {required ? (
            <i className="text-xs font-semibold text-[#0275D8]">*</i>
          ) : null}
          {miniLabel && (
            <span className="text-xs text-yellow-500 !font-normal">
              &nbsp; {miniLabel}
            </span>
          )}
        </label>
      )}
      <input
        disabled={disabled}
        className={`${
          formState?.errors[name] && !dontShowError && "errorControl"
        } ${fieldType === "password" && ""} `}
        type={
          fieldType === "password" ? (open ? "text" : fieldType) : fieldType
        }
        {...register(name)}
        id={name}
        placeholder={placeholder}
        onBlur={onBlur}
        autoComplete="off"
        {...rest}
      />
      {fieldType === "password" && (
        <span
          className={`absolute cursor-pointer right-2 ${
            topClass ? topClass : "top-[2.6rem]"
          }`}
        >
          {open ? (
            <EyeSlashIcon
              className="w-4 h-4"
              onClick={() => setOpen((prv) => !prv)}
            />
          ) : (
            <EyeIcon
              className="w-4 h-4"
              onClick={() => setOpen((prv) => !prv)}
            />
          )}
        </span>
      )}
      <div className="errorText text-xs flex items-start ">
        {!!getErrObject(name, formState?.errors) && !dontShowError && (
          <>
            <span className=" ">
              <InformationCircleIcon className="w-4 h-4 mr-1 inline" />
            </span>
            {getErrObject(name, formState?.errors)?.message}
          </>
        )}
      </div>
    </div>
  );
};

export { Input };
