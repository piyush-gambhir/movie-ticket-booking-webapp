"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SearchBar from "@/components/common/SearchBar";

const SearchFilters = ({ filters, setFilters, handleSearchChange }) => {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row">
      {/* Use the SearchBar component */}
      <SearchBar
        placeholder="Search Movies"
        searchValue={filters.search}
        onSearchChange={handleSearchChange}
      />

      <Select
        value={filters.genre}
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, genre: value }))
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          <SelectItem value="Action">Action</SelectItem>
          <SelectItem value="Comedy">Comedy</SelectItem>
          <SelectItem value="Drama">Drama</SelectItem>
          <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
          <SelectItem value="Thriller">Thriller</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.rating}
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, rating: value }))
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Ratings</SelectItem>
          <SelectItem value="G">G</SelectItem>
          <SelectItem value="PG">PG</SelectItem>
          <SelectItem value="PG-13">PG-13</SelectItem>
          <SelectItem value="R">R</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.language}
        onValueChange={(value) =>
          setFilters((prev) => ({ ...prev, language: value }))
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Languages</SelectItem>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="Spanish">Spanish</SelectItem>
          <SelectItem value="French">French</SelectItem>
          <SelectItem value="Japanese">Japanese</SelectItem>
          <SelectItem value="Korean">Korean</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilters;
