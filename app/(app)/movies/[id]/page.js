import MoviePage from "@/components/app/MoviePage";

async function getMovieData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/movies/${id}`,
    {
      cache: "no-store", // Fetches fresh data on each request
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie data");
  }

  return res.json();
}

export default async function MoviePageRoute({ params }) {
  const movieData = await getMovieData(params.id);

  // Assuming you have a list of theaters to pass
  const theaters = []; // Replace with actual theater data if needed

  return <MoviePage movieData={movieData} theaters={theaters} />;
}
