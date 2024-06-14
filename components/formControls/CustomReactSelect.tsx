import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect, { MultiValue, SingleValue } from "react-select";
import { getErrObject } from "../../utils/helpers";
interface Props {
  label: string;
  name: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  isMulti?: boolean;
  required?: boolean;
  disabled?: boolean;
}
const CustomSelect = ({
  label,
  name,
  isSearchable,
  isClearable,
  placeholder,
  options,
  isMulti,
  required,
  disabled,
}: Props) => {
  const { control, formState } = useFormContext();

  return (
    <div className="control custom-select">
      {label && (
        <label className="label" htmlFor={name}>
          {label} {required && <i className="text-xs text-[#0275D8]">*</i>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onBlur, onChange, value, ref } }) => (
          <ReactSelect
            isDisabled={disabled}
            ref={ref}
            id={name}
            placeholder={placeholder}
            options={options}
            isMulti={isMulti}
            isClearable={isClearable}
            isSearchable={isSearchable}
            className={`border-0 w-full  my-0.5 focus:outline-none focus:ring focus:border-blue-300
                            ${formState.errors[name] && "errorControl"}`}
            onBlur={onBlur}
            value={value}
            onChange={(
              newValue:
                | MultiValue<
                    | { value: string; label: string }[]
                    | { value: string; label: string }
                  >
                | SingleValue<{
                    value: string;
                    label: string;
                  }>,
            ) => onChange(newValue)}
          />
        )}
      />
      <p className="errorText">
        {!!getErrObject(name, formState?.errors) && (
          <>{getErrObject(name, formState?.errors)?.value.message}</>
        )}
      </p>
    </div>
  );
};

export { CustomSelect };
