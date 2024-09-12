"use client";

import React from "react";
import Image from "next/image";
import { CalendarIcon, StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function MovieCard({ movie, onBookClick }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3]">
          <Image
            src={movie.posterPath}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-2">
          <h3 className="truncate text-sm font-semibold">{movie.title}</h3>
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
          </div>
          <Button className="mt-2 w-full" onClick={() => onBookClick(movie.id)}>
            Book Tickets
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
