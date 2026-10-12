import React from "react";

import MoviePage from "@/components/app/movies/MoviePage";

import { getMovie } from "@/actions/movies";

export default async function MoviePageRoute(props) {
  const params = await props.params;
  const movieData = await getMovie({
    movieId: params.id,
  }).then((response) => response.data);

  const theaters = [];

  return <MoviePage movieData={movieData} theaters={theaters} />;
}
