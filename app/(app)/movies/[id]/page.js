import React from "react";

import MoviePage from "@/components/app/MoviePage";

import { getMovie } from "@/actions/movies";

export default async function MoviePageRoute({ params }) {
  const movieData = await getMovie({
    movieId: params.id,
  }).then((response) => response.data);

  const theaters = [];

  return <MoviePage movieData={movieData} theaters={theaters} />;
}
