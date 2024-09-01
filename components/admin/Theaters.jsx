"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";

import {
  getTheaters,
  addTheater,
  updateTheater,
  deleteTheater,
} from "@/actions/theaters";

import AddTheaterForm from "@/components/admin/AddTheaterForm"; // Ensure this path is correct

export default function Theaters() {
  const [theaters, setTheaters] = useState([]);
  const [query, setQuery] = useState("");
  const [sorting, setSorting] = useState({ sort: "name", order: "asc" });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isTheaterDialogOpen, setIsTheaterDialogOpen] = useState(false);
  const [editingTheater, setEditingTheater] = useState(null);

  useEffect(() => {
    fetchTheaters();
  }, [query, sorting, page]);

  const fetchTheaters = async () => {
    setIsLoading(true);
    const { success, data, error } = await getTheaters({
      query,
      page,
      limit: pagination.limit,
      sort: sorting.sort,
      order: sorting.order,
    });

    if (success) {
      setTheaters(data.theaters || []);
      setPagination((prev) => ({
        ...prev,
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
      }));
    } else {
      console.error("Failed to fetch theaters:", error);
    }
    setIsLoading(false);
  };

  const handleAddOrUpdateTheater = async (theaterData) => {
    let result;
    if (editingTheater) {
      result = await updateTheater({
        theaterData: { ...theaterData, id: editingTheater.id },
      });
    } else {
      result = await addTheater({ theaterData });
    }

    if (result.success) {
      fetchTheaters();
      handleCloseDialog();
    } else {
      console.error("Failed to add or update theater:", result.error);
    }
  };

  const handleDeleteTheater = async (id) => {
    const { success, error } = await deleteTheater({ theaterId: id });
    if (success) {
      fetchTheaters();
    } else {
      console.error("Failed to delete theater:", error);
    }
  };

  const handleOpenDialog = (theater = null) => {
    setEditingTheater(theater);
    setIsTheaterDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsTheaterDialogOpen(false);
    setEditingTheater(null);
  };

  const handleSortingChange = (newSort) => {
    setSorting(newSort);
  };

  return (
    <>
      <div className="mb-4 flex flex-col justify-between gap-y-4 lg:flex-row lg:gap-x-16">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search for theaters"
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
                  handleSortingChange({ sort: "name", order: "asc" })
                }
              >
                Name Ascending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSortingChange({ sort: "name", order: "desc" })
                }
              >
                Name Descending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSortingChange({ sort: "location", order: "asc" })
                }
              >
                Location Ascending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSortingChange({ sort: "location", order: "desc" })
                }
              >
                Location Descending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSortingChange({ sort: "capacity", order: "asc" })
                }
              >
                Capacity Ascending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSortingChange({ sort: "capacity", order: "desc" })
                }
              >
                Capacity Descending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog
            open={isTheaterDialogOpen}
            onOpenChange={setIsTheaterDialogOpen}
          >
            <Button variant="outline" onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Theater
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTheater ? "Edit Theater" : "Add New Theater"}
                </DialogTitle>
                <DialogDescription>
                  {editingTheater
                    ? "Edit the details of the theater."
                    : "Enter the details of the new theater."}
                </DialogDescription>
              </DialogHeader>
              <AddTheaterForm
                theater={editingTheater}
                onClose={handleCloseDialog}
                onSuccess={fetchTheaters}
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
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {theaters.map((theater) => (
              <TableRow key={theater.id}>
                <TableCell>{theater.name}</TableCell>
                <TableCell>{theater.location}</TableCell>
                <TableCell>{theater.capacity}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleOpenDialog(theater)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteTheater(theater.id)}
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
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, pagination.totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
