"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import SearchFilters from "@/components/app/movies/SearchFilters";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    genre: "all",
    rating: "all",
    language: "all",
    showTime: "all",
  });
  const [page, setPage] = useState(1);
  const [moviesPerPage] = useState(30);

  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const result = await getMovies({
        page: page,
        query: filters.search,
        genre: filters.genre !== "all" ? filters.genre : undefined,
        rating: filters.rating !== "all" ? filters.rating : undefined,
        language: filters.language !== "all" ? filters.language : undefined,
        limit: moviesPerPage,
        sort: "releaseDate",
        order: "desc",
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
  }, [page, filters]);

  const handleBookClick = (id) => {
    router.push(`${process.env.NEXT_PUBLIC_APP_URL}/movies/${id}`);
  };

  const paginationRange = useMemo(() => {
    const totalPagesToShow = 5;
    const totalPages = pagination.totalPages || 1;
    const currentPage = page;

    if (totalPages <= totalPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPages = [1, 2];
    const endPages = [totalPages - 1, totalPages];
    const middleRange = [];

    if (currentPage > 2 && currentPage < totalPages - 1) {
      middleRange.push(currentPage - 1, currentPage, currentPage + 1);
    } else if (currentPage === 2) {
      middleRange.push(currentPage, currentPage + 1);
    } else if (currentPage === totalPages - 1) {
      middleRange.push(currentPage - 1, currentPage);
    }

    return [
      ...startPages,
      currentPage > 3 ? "..." : null,
      ...middleRange,
      currentPage < totalPages - 2 ? "..." : null,
      ...endPages,
    ].filter(Boolean);
  }, [pagination.totalPages, page]);

  const handleSearchChange = useCallback((value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  }, []);

  return (
    <main className="container mx-auto flex min-h-screen px-4 py-8">
      <section className="flex-1">
        {/* Use the separated SearchFilters component */}
        <SearchFilters
          filters={filters}
          setFilters={setFilters}
          handleSearchChange={handleSearchChange}
        />

        {/* Movies List */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {Array.from({ length: moviesPerPage }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
                {paginationRange.map((item, index) => (
                  <PaginationItem className="" key={index}>
                    {typeof item === "number" ? (
                      <PaginationLink
                        href="#"
                        onClick={() => setPage(item)}
                        isActive={page === item}
                        className="!px-8"
                      >
                        {item}
                      </PaginationLink>
                    ) : (
                      <PaginationEllipsis />
                    )}
                  </PaginationItem>
                ))}
                <PaginationItem className="">
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setPage((prev) =>
                        Math.min(prev + 1, pagination.totalPages),
                      )
                    }
                    className="!px-8"
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
