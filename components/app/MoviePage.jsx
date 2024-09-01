"use client";

import { useState } from "react";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MoviePage({ movieData, theaters }) {
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);

  const genres = movieData.genres || ["Comedy", "Horror"]; // Use actual genres if available

  return (
    <div className="bg-primary-50 container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="relative h-[600px] w-[400px] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movieData.posterPath}`}
              alt={`${movieData.title} poster`}
              fill
              className="object-cover transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
        <div className="space-y-8 md:col-span-2">
          <div className="space-y-2">
            <h1 className="text-primary-900 text-4xl font-bold">
              {movieData.title}
            </h1>
            <p className="text-primary-700 text-xl">
              {movieData.originalTitle}
            </p>
            <div className="flex items-center space-x-2">
              <p className="text-primary-600 text-sm">
                {new Date(movieData.releaseDate).getFullYear()}
              </p>
              {genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="bg-primary-100 text-primary-800"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <StarIcon className="h-6 w-6 text-yellow-400" />
            <span className="text-primary-900 text-2xl font-bold">
              {movieData.voteAverage.toFixed(1)}
            </span>
            <span className="text-primary-700">/10</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-primary-900 text-2xl font-semibold">
              About the movie
            </h2>
            <p className="text-primary-800">{movieData.overview}</p>
            <div className="text-primary-700 flex space-x-4 text-sm">
              <p>
                Original Language: {movieData.originalLanguage.toUpperCase()}
              </p>
              <p>Vote Count: {movieData.voteCount}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-primary-900 text-2xl font-semibold">
              Select Theater and Showtime
            </h2>
            <ScrollArea className="border-primary-200 h-[300px] rounded-md border p-4">
              {theaters.map((theater) => (
                <Card key={theater.id} className="bg-primary-100 mb-4">
                  <CardContent className="p-4">
                    <h3 className="text-primary-800 mb-2 text-lg font-semibold">
                      {theater.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {theater.showtimes.map((showtime) => (
                        <Button
                          key={showtime.id}
                          variant="outline"
                          size="sm"
                          className={`text-primary-800 hover:bg-primary-200 bg-white ${
                            selectedShowtime?.id === showtime.id
                              ? "ring-primary-500 ring-2"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedShowtime(showtime);
                            setSelectedTheater(theater);
                          }}
                        >
                          {showtime.time} - ${showtime.price}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </div>

          <Button
            className="bg-primary-600 hover:bg-primary-700 w-full text-white"
            disabled={!selectedShowtime}
          >
            {selectedShowtime
              ? `Book Tickets for ${selectedTheater?.name} at ${selectedShowtime.time} - $${selectedShowtime.price}`
              : "Select a showtime"}
          </Button>
        </div>
      </div>
    </div>
  );
}
