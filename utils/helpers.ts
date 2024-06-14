import { yupResolver as yupResolvers } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { FieldValues } from "react-hook-form";
import { getCode, getData } from "country-list";

// console.log(CurrencyList.getAll())

const isClient = () => typeof window === "object";

const yupResolver = isClient() ? yupResolvers : undefined;

export const formatDate = (date: string | number | Date) => {
  if (!date) return "";
  return format(new Date(date), "MMMM dd, yyyy");
};
export const stringToDate = (dateString: string) => {
  // Split the input string into year, month, and day components
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");

  // Create a new Date object with the components (month is 0-based, so subtract 1)
  const formattedDate = new Date(Number(year), Number(month) - 1, Number(day));

  return formattedDate;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const monthList = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];
export const monthOptions = monthList.map((list) => ({
  ...list,
  value: list.value.toUpperCase(),
  label: list.label.toUpperCase(),
}));
export const countryOptions = getData().map(({ name }: { name: string }) => ({
  value: getCode(name) as string,
  label: name,
}));

export const getErrObject = (name: string, errors: FieldValues) => {
  const nameArray = name.split(".");
  return nameArray.reduce(function (acc, item) {
    if (!acc) return null;
    if (acc[item]) {
      return acc[item];
    } else {
      return null;
    }
  }, errors as FieldValues);
};

const passwordConditions = {
  minLengthRegex: /^.{8,}$/,
  minOneLetterRegex: /[a-z]/i,
  minOneUpperCaseRegex: /.*[A-Z].*/,
  minOneLowerCaseRegex: /.*[a-z].*/,
  minOneNumberRegex: /\d{1,}/,
  minOneSpecialRegex: /[-+_!@#$%^&*.,?]/,
  nameRegexChecker: /^(?![ .]+$)[a-zA-Z .-]*$/i,
};

export { isClient, yupResolver, passwordConditions, scrollToTop };


