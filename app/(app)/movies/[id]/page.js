import React from "react";
import { sendGTMEvent } from "@next/third-parties/google";

import MoviePage from "@/components/app/movies/MoviePage";

import { getMovie } from "@/actions/movies";

export default async function MoviePageRoute({ params }) {
  const movieData = await getMovie({
    movieId: params.id,
  }).then((response) => response.data);

  const theaters = [];
  sendGTMEvent({
    event: "movie_view",
    movieId: movieData.id,
    movieName: movieData.name,
  });
  return <MoviePage movieData={movieData} theaters={theaters} />;
}
