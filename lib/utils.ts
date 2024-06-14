import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

// Data Processing
// -------------------------------------------------------
export function sliceData<T>(data: T[], count: number): T[] {
  return data.slice(0, count);
}

export function currencyFormatter(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export function quantityFormatter(value: number): string {
  return `${value.toLocaleString()} T`;
}

export function formatNumberWithCommas(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// -------------------------------------------------------
