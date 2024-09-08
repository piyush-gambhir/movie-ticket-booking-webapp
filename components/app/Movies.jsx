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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import MovieCard from "@/components/common/MovieCard";
import MovieCardSkeleton from "@/components/common/MovieCardSkeleton";

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
  const [moviesPerPage] = useState(20);

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
      <section className="flex-1">
        {/* Filter Bar */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Search movies..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full"
            />
          </div>
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
