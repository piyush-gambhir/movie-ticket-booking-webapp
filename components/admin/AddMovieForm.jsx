"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Component() {
  const [movie, setMovie] = useState({
    imdbId: "",
    title: "",
    originalTitle: "",
    backdropPath: "",
    posterPath: "",
    overview: "",
    releaseDate: "",
    popularity: "",
    adult: false,
    mediaType: "",
    originalLanguage: "",
    voteAverage: "",
    voteCount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked) => {
    setMovie((prev) => ({ ...prev, adult: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the movie data to your backend
    console.log("Submitting movie:", movie);
    // Reset form after submission
    setMovie({
      imdbId: "",
      title: "",
      originalTitle: "",
      backdropPath: "",
      posterPath: "",
      overview: "",
      releaseDate: "",
      popularity: "",
      adult: false,
      mediaType: "",
      originalLanguage: "",
      voteAverage: "",
      voteCount: "",
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add New Movie</CardTitle>
        <CardDescription>Enter the details of the new movie</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="imdbId">IMDB ID</Label>
              <Input
                id="imdbId"
                name="imdbId"
                value={movie.imdbId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={movie.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalTitle">Original Title</Label>
              <Input
                id="originalTitle"
                name="originalTitle"
                value={movie.originalTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backdropPath">Backdrop Path</Label>
              <Input
                id="backdropPath"
                name="backdropPath"
                value={movie.backdropPath}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="posterPath">Poster Path</Label>
              <Input
                id="posterPath"
                name="posterPath"
                value={movie.posterPath}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="releaseDate">Release Date</Label>
              <Input
                id="releaseDate"
                name="releaseDate"
                type="date"
                value={movie.releaseDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="popularity">Popularity</Label>
              <Input
                id="popularity"
                name="popularity"
                type="number"
                step="0.01"
                value={movie.popularity}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mediaType">Media Type</Label>
              <Input
                id="mediaType"
                name="mediaType"
                value={movie.mediaType}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalLanguage">Original Language</Label>
              <Input
                id="originalLanguage"
                name="originalLanguage"
                value={movie.originalLanguage}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voteAverage">Vote Average</Label>
              <Input
                id="voteAverage"
                name="voteAverage"
                type="number"
                step="0.1"
                value={movie.voteAverage}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voteCount">Vote Count</Label>
              <Input
                id="voteCount"
                name="voteCount"
                type="number"
                value={movie.voteCount}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="overview">Overview</Label>
            <Textarea
              id="overview"
              name="overview"
              value={movie.overview}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="adult"
              checked={movie.adult}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="adult">Adult Content</Label>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit}>
          Add Movie
        </Button>
      </CardFooter>
    </Card>
  );
}
