import typesenseClient from "@/lib/typesense/typesenseClient";

export async function searchData({
  collectionName,
  query,
  queryByFields,
  filters,
  sortBy,
  facets,
  page = 1,
  perPage = 10,
}) {
  try {
    const searchParameters = {
      q: query,
      query_by: queryByFields,
      page,
      per_page: perPage,
      sort_by: sortBy,
      facet_by: facets ? facets.join(",") : undefined,
      filter_by: filters,
    };

    const searchResults = await typesenseClient
      .collections(collectionName)
      .documents()
      .search(searchParameters);
    console.log(`Search results from ${collectionName}:`, searchResults);
    return searchResults;
  } catch (error) {
    console.error(`Error searching in ${collectionName}:`, error);
    throw new Error(error.message);
  }
}
