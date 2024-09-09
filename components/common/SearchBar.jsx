"use client";
import React, { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";

import useDebounce from "@/hooks/common/useDebounce";

const SearchBar = ({ searchValue, onSearchChange, placeholder }) => {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  const debouncedSearchValue = useDebounce(localSearchValue, 500);

  useEffect(() => {
    onSearchChange(debouncedSearchValue);
  }, [debouncedSearchValue, onSearchChange]);

  const handleInputChange = (e) => {
    setLocalSearchValue(e.target.value);
  };

  return (
    <div className="flex-grow">
      <Input
        type="text"
        placeholder={placeholder}
        value={localSearchValue}
        onChange={handleInputChange}
        className="w-full"
      />
    </div>
  );
};

export default SearchBar;
