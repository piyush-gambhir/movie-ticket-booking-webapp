"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import AddMovieForm from "@/components/admin/AddMovieForm";
import {
  getMovies,
  deleteMovie,
  getMovie,
  updateMovieAction,
} from "@/actions/movies";

export default function Movies() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [sorting, setSorting] = useState({ sort: "dateAdded", order: "desc" });
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalPages: 1,
  });

  const [editingMovie, setEditingMovie] = useState(null);
  const [isMovieDialogOpen, setIsMovieDialogOpen] = useState(false);

  const handleGetMovies = async () => {
    setIsLoading(true);
    const { success, data, error } = await getMovies({
      query,
      page,
      limit: 10,
      sort: sorting.sort,
      order: sorting.order,
    });

    if (success) {
      setMovies(data?.movies || []);
      setPagination(data?.pagination || {});
    } else {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetMovies();
  }, [page, query, sorting]);

  const handleDeleteMovie = async (id) => {
    const { success, error } = await deleteMovie({ movieId: id });
    if (success) {
      handleGetMovies();
    } else {
      console.error("Failed to delete movie:", error);
    }
  };

  const handleEditMovie = async (movie) => {
    setEditingMovie(movie);
    setIsMovieDialogOpen(true);
  };

  const handleAddOrEditSuccess = () => {
    handleGetMovies();
    setIsMovieDialogOpen(false);
    setEditingMovie(null);
  };

  return (
    <>
      <div className="mb-4 flex flex-col justify-between gap-y-4 lg:flex-row lg:gap-x-16">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search for movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  handleSortingChange({ sort: "title", order: "asc" })
                }
              >
                Title Ascending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSortingChange({ sort: "title", order: "desc" })
                }
              >
                Title Descending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSortingChange({ sort: "dateAdded", order: "asc" })
                }
              >
                Date Added Ascending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSortingChange({ sort: "dateAdded", order: "desc" })
                }
              >
                Date Added Descending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Button to open the dialog for adding a new movie */}
          <Dialog open={isMovieDialogOpen} onOpenChange={setIsMovieDialogOpen}>
            <Button
              variant="outline"
              onClick={() => setIsMovieDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Movie
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingMovie ? "Edit Movie" : "Add New Movie"}
                </DialogTitle>
                <DialogDescription>
                  {editingMovie
                    ? "Edit the details of the movie."
                    : "Enter the details of the new movie."}
                </DialogDescription>
              </DialogHeader>
              {/* Include the AddMovieForm here */}
              <AddMovieForm
                movie={editingMovie}
                onClose={() => setIsMovieDialogOpen(false)}
                onSuccess={handleAddOrEditSuccess}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2
            className="h-8 w-8 animate-spin text-primary"
            aria-hidden="true"
          />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>IMDb ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Original Title</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Release Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.imdbId}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.originalTitle}</TableCell>
                <TableCell>
                  {new Date(movie.createdAt).toLocaleDateString(
                    {},
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </TableCell>
                <TableCell>
                  {new Date(movie.releaseDate).toLocaleDateString(
                    {},
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditMovie(movie)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteMovie(movie.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => setPage(i + 1)}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {pagination.totalPages > 5 && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setPage((prev) => prev + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
