const typesenseMoviesSchema = {
  name: "movies",
  fields: [
    { name: "id", type: "string" }, // Using string for UUID
    { name: "imdbId", type: "string", facet: false },
    { name: "title", type: "string", facet: false }, // Movie name search
    { name: "originalTitle", type: "string", facet: false },
    { name: "backdropPath", type: "string", optional: true },
    { name: "posterPath", type: "string", optional: true },
    { name: "overview", type: "string", facet: false, optional: true },
    { name: "releaseDate", type: "string", facet: false, optional: true }, // Date as string for sorting
    { name: "popularity", type: "float", facet: false, optional: true },
    { name: "adult", type: "bool", facet: true, optional: true },
    { name: "mediaType", type: "string", facet: true, optional: true },
    { name: "genres", type: "string[]", facet: true, optional: true }, // Facet for filtering by genre
    { name: "originalLanguage", type: "string", facet: true, optional: true }, // Facet for filtering by language
    { name: "voteAverage", type: "float", facet: true, optional: true }, // Facet for filtering by ratings
    { name: "voteCount", type: "int32", facet: false, optional: true },
    { name: "createdAt", type: "string", optional: true },
    { name: "updatedAt", type: "string", optional: true },
  ],
  default_sorting_field: "",
};

module.exports = typesenseMoviesSchema;
