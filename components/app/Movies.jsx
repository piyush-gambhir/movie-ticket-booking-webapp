"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

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

import MovieCard from "@/components/common/MovieCard";
import MovieCardSkeleton from "@/components/common/MovieCardSkeleton";

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

  const router = useRouter();

  const genresData = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 10749, name: "Romance" },
    { id: 27, name: "Horror" },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const result = await getMovies({
        page: page,
        query: "",
        limit: moviesPerPage,
        sort: "releaseDate",
        order: "asc",
      });
      if (result.success) {
        setMovies(result.data.movies);
        setPagination(result.data.pagination);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [page]);

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
    setPage(1);
  };

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchGenre =
        filters.genres.length === 0 ||
        movie.genre_ids.some((genre) => filters.genres.includes(genre));
      const matchYear =
        !filters.releaseYear ||
        movie.releaseDate.split("-")[0] === filters.releaseYear;
      const matchPopularity =
        !filters.popularity ||
        movie.popularity >= parseFloat(filters.popularity);

      return matchGenre && matchYear && matchPopularity;
    });
  }, [movies, filters]);

  const handleBookClick = (id) => {
    router.push(`${process.env.NEXT_PUBLIC_APP_URL}/movies/${id}`);
  };

  // Pagination logic with ellipsis
  const paginationRange = useMemo(() => {
    const totalPagesToShow = 5; // Number of pagination items to show
    const totalPages = pagination.totalPages || 1;
    const currentPage = page;

    if (totalPages <= totalPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPages = [1, 2]; // First pages to always show
    const endPages = [totalPages - 1, totalPages]; // Last pages to always show
    const middleRange = [];

    if (currentPage > 2 && currentPage < totalPages - 1) {
      middleRange.push(currentPage - 1, currentPage, currentPage + 1);
    } else if (currentPage === 2) {
      middleRange.push(currentPage, currentPage + 1);
    } else if (currentPage === totalPages - 1) {
      middleRange.push(currentPage - 1, currentPage);
    }

    // Merge everything together with ellipsis
    return [
      ...startPages,
      currentPage > 3 ? "..." : null,
      ...middleRange,
      currentPage < totalPages - 2 ? "..." : null,
      ...endPages,
    ].filter(Boolean); // Remove null values
  }, [pagination.totalPages, page]);

  return (
    <main className="container mx-auto flex min-h-screen px-4 py-8">
      <FilterBar genres={genresData} onFilterChange={handleFilterChange} />

      <section className="ml-4 flex-1">
        {loading ? (
          <div className="3xl:grid-cols-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: moviesPerPage }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="3xl:grid-cols-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onBookClick={handleBookClick}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination className="mt-4">
              <PaginationContent className="">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  />
                </PaginationItem>
                {paginationRange.map((item, index) => (
                  <PaginationItem key={index}>
                    {typeof item === "number" ? (
                      <PaginationLink
                        href="#"
                        onClick={() => setPage(item)}
                        isActive={page === item}
                      >
                        {item}
                      </PaginationLink>
                    ) : (
                      <PaginationEllipsis />
                    )}
                  </PaginationItem>
                ))}
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
