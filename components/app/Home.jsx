"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/common/MovieCard";

export default function Home({ moviesData }) {
  const [movies, setMovies] = useState(moviesData);
  const carouselRef = useRef(null);
  const router = useRouter();

  const handleBookClick = (id) => {
    router.push(`${process.env.NEXT_PUBLIC_APP_URL}/movies/${id}`);
  };

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      {/* Banner Carousel */}
      <Carousel
        ref={carouselRef}
        className="relative mx-auto mb-12 w-full"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies?.slice(0, 5).map((movie) => (
            <CarouselItem
              key={movie?.id}
              className="basis-4/5 pl-2 md:basis-2/3 md:pl-4 lg:basis-1/2"
            >
              <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
                <Image
                  src={movie?.backdropPath}
                  alt={movie?.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h2 className="mb-2 text-xl font-bold text-white md:text-3xl">
                      {movie?.title}
                    </h2>
                    <Button
                      className="bg-red-600 text-white hover:bg-red-700"
                      onClick={() => handleBookClick(movie?.id)}
                    >
                      Book &gt;
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white">
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white">
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </CarouselNext>
      </Carousel>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Recommended Movies</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard
              key={movie?.id}
              movie={movie}
              onBookClick={handleBookClick}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
