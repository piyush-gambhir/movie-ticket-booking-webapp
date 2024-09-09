"use client";

import { useSearchParams } from "next/navigation";

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);

  const setQueryParams = (newQueryParams) => {
    setSearchParams(new URLSearchParams(newQueryParams));
  };

  return [queryParams, setQueryParams];
};

export default useQueryParams;
