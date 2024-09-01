"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Theaters() {
  const [theaters, setTheaters] = useState([
    {
      id: 1,
      name: "Cineplex Downtown",
      location: "123 Main St, Downtown",
      capacity: 200,
    },
    {
      id: 2,
      name: "Starlight Cinema",
      location: "456 Park Ave, Uptown",
      capacity: 150,
    },
  ]);

  const [isTheaterDialogOpen, setIsTheaterDialogOpen] = useState(false);
  const [editingTheater, setEditingTheater] = useState(null);
  const [newTheater, setNewTheater] = useState({
    name: "",
    location: "",
    capacity: 0,
  });

  const handleAddTheater = () => {
    setTheaters([
      ...theaters,
      { ...newTheater, id: Math.max(0, ...theaters.map((t) => t.id)) + 1 },
    ]);
    setNewTheater({ name: "", location: "", capacity: 0 });
    setIsTheaterDialogOpen(false);
  };

  const handleUpdateTheater = () => {
    if (editingTheater) {
      setTheaters(
        theaters.map((theater) =>
          theater.id === editingTheater.id ? editingTheater : theater,
        ),
      );
      setEditingTheater(null);
      setIsTheaterDialogOpen(false);
    }
  };

  const handleDeleteTheater = (id) => {
    setTheaters(theaters.filter((theater) => theater.id !== id));
  };

  const theaterFields = [
    { id: "name", label: "Name", type: "text" },
    { id: "location", label: "Location", type: "text" },
    { id: "capacity", label: "Capacity", type: "number" },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Theater List</h2>
      </div>
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
                    onClick={() => {
                      setEditingTheater(theater);
                      setIsTheaterDialogOpen(true);
                    }}
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
    </>
  );
}
