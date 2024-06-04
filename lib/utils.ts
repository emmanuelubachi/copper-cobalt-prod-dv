import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function sliceData<T>(data: T[], count: number): T[] {
  return data.slice(0, count);
}
