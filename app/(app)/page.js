import React from "react";

import { getMovies } from "@/actions/movies";

import Home from "@/components/app/Home";

export default async function page() {
  const moviesData = await getMovies({
    query: "",
    page: 1,
    limit: 10,
  }).then((data) => data?.data);
  return <Home moviesData={moviesData} />;
}
