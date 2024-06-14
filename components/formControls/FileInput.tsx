import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Dropzone from "react-dropzone";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getErrObject } from "../../utils/helpers";

type Props = {
  name: string;
  files?: File[];
  setFiles?: React.Dispatch<React.SetStateAction<File[] | null | undefined>>;
  disabled?: boolean;
  label?: string;
  title?: string;
  miniTitle?: string;
  multiple?: boolean;
  accept?: { [Key: string]: string[] };
  image?: string;
  fileSelected?: (file: File) => void;
  imageProp?: string | null | undefined;
};
const FileInput = ({
  name,
  disabled,
  label,
  title,
  miniTitle,
  multiple,
  image,
  accept,
  fileSelected,
  imageProp,
  ...rest
}: Props) => {
  const { formState, control } = useFormContext();
  const [imgData, setImgData] = useState<string | null | undefined>(imageProp);

  return (
    <div className="control">
      <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({ field: { onChange, onBlur } }) => (
          <>
            {title && (
              <label className="label" htmlFor={name}>
                {title}
                {miniTitle && (
                  <span className="text-xs text-yellow-500 !font-normal">
                    &nbsp; {miniTitle}
                  </span>
                )}
              </label>
            )}
            <Dropzone
              onDrop={(e) => {
                onChange(e);
                setImgData(URL.createObjectURL(e[0]));
                fileSelected && fileSelected(e[0]);
              }}
              multiple={multiple}
              accept={accept}
            >
              {({ isDragActive, getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className={` border-2 p-4 text-center sm:min-h-[8rem] focus:outline-none font-normal bg-[#fafbfc] text-sm text-[#7A869A] cursor-pointer rounded-lg
                    ${isDragActive && " border-blue-500"}`}
                >
                  <input
                    id="careerImage"
                    {...getInputProps()}
                    name={name}
                    onBlur={onBlur}
                    disabled={disabled}
                    {...rest}
                  />
                  <p>
                    {label ? (
                      label
                    ) : (
                      <span className="text-center">
                        <span className="text-sm text-[#4388C8]">
                          Click here
                        </span>{" "}
                        to Upload image or drag and drop PNG, SVG, JPG file (Max
                        size 800X450 pixels)
                      </span>
                    )}
                  </p>
                  {(image || imgData) && (
                    <img
                      src={(imgData as string) ?? image}
                      alt="career path"
                      className="max-h-52"
                    />
                  )}
                </div>
              )}
            </Dropzone>
            <div>
              {!!getErrObject(name, formState?.errors) && (
                <p className="errorText">
                  <>
                    {" "}
                    <InformationCircleIcon className="w-4 h-4 mr-1" />
                    {getErrObject(name, formState?.errors)?.message}
                  </>
                </p>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
};

export { FileInput };
