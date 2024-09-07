import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Generates a new URL query string by updating the given search param
 * @param name the search param name to update
 * @param value the new value for the search param
 * @returns the new URL query string
 */
export default function useUpdateSearchParams() {
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return createQueryString;
}
