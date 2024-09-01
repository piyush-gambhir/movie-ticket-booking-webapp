"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import MovieCard from "@/components/common/MovieCard";

import { getMovies } from "@/actions/movies";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const FilterBar = ({ genres, onFilterChange }) => {
  return (
    <div className="h-full max-h-[60vh] w-full rounded-lg p-4 md:w-1/4">
      <h3 className="mb-4 text-lg font-semibold">Filter By</h3>

      {/* Genre Filter */}
      <div className="mb-4">
        <h4 className="text-md mb-2 font-semibold">Genre</h4>
        <div className="flex flex-col">
          {genres.map((genre) => (
            <label key={genre.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={(e) =>
                  onFilterChange("genre", genre.id, e.target.checked)
                }
              />
              {genre.name}
            </label>
          ))}
        </div>
      </div>

      {/* Release Year Filter */}
      <div className="mb-4">
        <h4 className="text-md mb-2 font-semibold">Release Year</h4>
        <input
          type="number"
          min="1900"
          max={new Date().getFullYear()}
          className="w-full rounded border p-2"
          onChange={(e) => onFilterChange("releaseYear", e.target.value)}
          placeholder="e.g. 2020"
        />
      </div>

      {/* Popularity Filter */}
      <div className="mb-4">
        <h4 className="text-md mb-2 font-semibold">Popularity</h4>
        <input
          type="number"
          min="0"
          max="100"
          className="w-full rounded border p-2"
          onChange={(e) => onFilterChange("popularity", e.target.value)}
          placeholder="e.g. 50"
        />
      </div>
    </div>
  );
};

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    genres: [],
    releaseYear: "",
    popularity: "",
  });
  const [page, setPage] = useState(1);
  const [moviesPerPage] = useState(20);
  const [sorting, setSorting] = useState({
    sort: "releaseDate",
    order: "asc",
  });
  const router = useRouter();

  // Hardcoded genres data
  const genresData = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 10749, name: "Romance" },
    { id: 27, name: "Horror" },
    // Add more genres as needed
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const result = await getMovies({
        page,
        limit: moviesPerPage,
        sort: sorting.sort,
        order: sorting.order,
      });
      if (result.success) {
        setMovies(result.data.movies);
        setPagination(result.data.pagination);
        console.log(result.data.pagination);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [
    page,
    moviesPerPage,
    sorting.sort,
    sorting.order,
    filters.genres,
    filters.releaseYear,
    filters.popularity,
  ]);

  const handleFilterChange = (type, value, checked) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (type === "genre") {
        newFilters.genres = checked
          ? [...newFilters.genres, value]
          : newFilters.genres.filter((id) => id !== value);
      } else {
        newFilters[type] = value;
      }

      return newFilters;
    });
    setPage(1); // Reset to first page when filters change
  };

  const handleBookClick = (id) => {
    router.push(`${process.env.NEXT_PUBLIC_APP_URL}/movies/${id}`);
  };

  return (
    <main className="container mx-auto flex min-h-screen px-4 py-8">
      <FilterBar genres={genresData} onFilterChange={handleFilterChange} />

      <section className="ml-4 flex-1">
        <h2 className="mb-4 text-2xl font-bold">Movies</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="3xl:grid-cols-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onBookClick={handleBookClick}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  />
                </PaginationItem>
                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={() => setPage(i + 1)}
                      isActive={page === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {pagination.totalPages > 5 && <PaginationEllipsis />}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setPage((prev) =>
                        Math.min(prev + 1, pagination.totalPages),
                      )
                    }
                    disabled={page === pagination.totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </section>
    </main>
  );
}
