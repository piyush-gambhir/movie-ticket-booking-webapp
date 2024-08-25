"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const carouselRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/movies`)
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const handleBookClick = (id) => {
    router.push(`${process.env.NEXT_PUBLIC_APP_URL}/movies/${id}`);
  };

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      {/* Banner Carousel */}
      <Carousel
        ref={carouselRef}
        className="relative mx-auto mb-12 w-full max-w-7xl"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies.slice(0, 5).map((movie, index) => (
            <CarouselItem
              key={movie.id}
              className="basis-4/5 pl-2 md:basis-2/3 md:pl-4 lg:basis-1/2"
            >
              <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdropPath}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h2 className="mb-2 text-xl font-bold text-white md:text-3xl">
                      {movie.title}
                    </h2>
                    <Button
                      className="bg-red-600 text-white hover:bg-red-700"
                      onClick={() => handleBookClick(movie.id)}
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

      {/* Recommended Movies */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Recommended Movies</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[2/3]">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2">
                  <h3 className="truncate text-sm font-semibold">
                    {movie.title}
                  </h3>
                  <div className="my-2 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {new Date(movie.releaseDate).getFullYear()}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <StarIcon className="mr-1 h-3 w-3" />
                      {movie.voteAverage.toFixed(1)}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {movie.voteCount} votes
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBookClick(movie.id)}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
