"use server";

export async function fetchMovieData({ imdbId }) {
  const url = `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`;
  const apiKey = process.env.TMDB_API_KEY;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching movie data: ${response.statusText}`);
    }

    const data = await response.json();
    const movie = data.movie_results[0];

    if (!movie) {
      throw new Error("Movie not found");
    }

    const formattedMovieData = {
      imdbId: imdbId,
      title: movie.title,
      originalTitle: movie.original_title,
      backdropPath: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      overview: movie.overview,
      releaseDate: movie.release_date,
      popularity: movie.popularity,
      adult: movie.adult,
      mediaType: movie.media_type,
      originalLanguage: movie.original_language,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
    };

    return formattedMovieData;
  } catch (error) {
    console.error("Failed to fetch and format movie data:", error);
    throw error;
  }
}
