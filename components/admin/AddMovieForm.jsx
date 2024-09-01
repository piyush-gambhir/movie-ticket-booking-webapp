"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { DatePicker } from "@/components/common/datepicker";

import { addMovie, updateMovie } from "@/actions/movies";

import { addMovieSchema } from "@/lib/zod/movie";

export default function AddMovieForm({ movie = null, onClose, onSuccess }) {
  const [movieData, setMovieData] = useState({
    imdbId: "",
    title: "",
    originalTitle: "",
    backdropPath: "",
    posterPath: "",
    overview: "",
    releaseDate: "", // Initialize as an empty string for DatePicker compatibility
    popularity: "",
    adult: false,
    mediaType: "",
    originalLanguage: "",
    voteAverage: "",
    voteCount: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (movie) {
      setMovieData({
        ...movie,
        releaseDate: movie.releaseDate
          ? new Date(movie.releaseDate).toISOString()
          : "", // Convert date to ISO string
      });
    }
  }, [movie]);

  const validateField = (name, value) => {
    const tempData = { ...movieData, [name]: value };
    try {
      addMovieSchema.parse(tempData);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      const validationErrors = err.flatten().fieldErrors;
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) || "" : value;

    setMovieData((prev) => ({ ...prev, [name]: parsedValue }));
    validateField(name, parsedValue);
  };

  const handleCheckboxChange = (checked) => {
    setMovieData((prev) => ({ ...prev, adult: checked }));
    setErrors((prev) => ({ ...prev, adult: undefined }));
  };

  const handleDateChange = (dateString) => {
    setMovieData((prev) => ({ ...prev, releaseDate: dateString }));
    validateField("releaseDate", dateString);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const parsedMovieData = {
        ...movieData,
        releaseDate: movieData.releaseDate
          ? new Date(movieData.releaseDate)
          : null,
        popularity: movieData.popularity
          ? parseFloat(movieData.popularity)
          : undefined,
        voteAverage: movieData.voteAverage
          ? parseFloat(movieData.voteAverage)
          : undefined,
        voteCount: movieData.voteCount
          ? parseInt(movieData.voteCount, 10)
          : undefined,
      };

      addMovieSchema.parse(parsedMovieData);

      let result;
      if (movie) {
        result = await updateMovie({
          movieData: {
            id: movie.id,
            ...parsedMovieData,
          },
        });
      } else {
        result = await addMovie({ movieData: parsedMovieData });
      }

      if (result.success) {
        onSuccess();
        setMovieData({
          id: "", // Reset id after successful submission
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
        setErrors({});
      } else {
        setFormError(result.error);
      }
    } catch (error) {
      console.error("Error submitting movie:", error);
      setFormError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-none bg-transparent">
      <CardContent className="px-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "imdbId", label: "IMDB ID", type: "text", required: false },
              { id: "title", label: "Title", type: "text", required: true },
              {
                id: "originalTitle",
                label: "Original Title",
                type: "text",
                required: true,
              },
              { id: "backdropPath", label: "Backdrop Path", type: "text" },
              { id: "posterPath", label: "Poster Path", type: "text" },
              {
                id: "popularity",
                label: "Popularity",
                type: "number",
                step: "0.01",
              },
              { id: "mediaType", label: "Media Type", type: "text" },
              {
                id: "originalLanguage",
                label: "Original Language",
                type: "text",
              },
              {
                id: "voteAverage",
                label: "Vote Average",
                type: "number",
                step: "0.1",
              },
              { id: "voteCount", label: "Vote Count", type: "number" },
            ].map(({ id, label, type, step, required }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  name={id}
                  type={type}
                  step={step}
                  value={movieData[id]}
                  onChange={handleChange}
                  required={required}
                  aria-invalid={errors[id] ? "true" : "false"}
                />
                {errors[id] && <p className="text-red-500">{errors[id]}</p>}
              </div>
            ))}
            <div className="space-y-2">
              <Label htmlFor="releaseDate">Release Date</Label>
              <DatePicker
                selectedDate={movieData.releaseDate}
                onDateChange={handleDateChange}
                id="releaseDate"
              />
              {errors.releaseDate && (
                <p className="text-red-500">{errors.releaseDate}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="overview">Overview</Label>
            <Textarea
              id="overview"
              name="overview"
              value={movieData.overview}
              onChange={handleChange}
            />
            {errors.overview && (
              <p className="text-red-500">{errors.overview}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="adult"
              checked={movieData.adult}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="adult">Adult Content</Label>
          </div>
          {formError && (
            <div className="text-red-500">
              {Array.isArray(formError)
                ? formError.map((err) => <p key={err.path}>{err.message}</p>)
                : formError}
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex flex-row gap-x-2">
        <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting
            ? movie
              ? "Updating..."
              : "Adding..."
            : movie
              ? "Update Movie"
              : "Add Movie"}
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
