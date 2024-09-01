"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { addTheater, updateTheater } from "@/actions/theaters";
import { theaterSchema } from "@/lib/zod/theater";

export default function AddTheaterForm({ theater = null, onClose, onSuccess }) {
  const [theaterData, setTheaterData] = useState({
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    totalSeats: 0,
    imageUrl: "",
    contactNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (theater) {
      setTheaterData(theater);
    }
  }, [theater]);

  const validateField = (name, value) => {
    const tempData = { ...theaterData, [name]: value };
    try {
      theaterSchema.parse(tempData);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      const validationErrors = err.flatten().fieldErrors;
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) || "" : value;

    if (name.includes(".")) {
      const [key, subKey] = name.split(".");
      setTheaterData((prev) => ({
        ...prev,
        [key]: { ...prev[key], [subKey]: parsedValue },
      }));
    } else {
      setTheaterData((prev) => ({ ...prev, [name]: parsedValue }));
    }
    validateField(name, parsedValue);
  };

  const handleSeatsChange = (index, field, value) => {
    const updatedSeats = theaterData.seats.map((seat, idx) =>
      idx === index ? { ...seat, [field]: value } : seat,
    );
    setTheaterData((prev) => ({ ...prev, seats: updatedSeats }));
  };

  const handleAddSeat = () => {
    setTheaterData((prev) => ({
      ...prev,
      seats: [...prev.seats, { row: "", seatNumber: 0, type: "standard" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      theaterSchema.parse(theaterData);

      let result;
      if (theater) {
        result = await updateTheater({
          theaterData: {
            id: theater.id,
            ...theaterData,
          },
        });
      } else {
        result = await addTheater({ theaterData });
      }

      if (result.success) {
        onSuccess();
        setTheaterData({
          name: "",
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          },
          totalSeats: 0,
          seats: [{ row: "", seatNumber: 0, type: "standard" }],
          imageUrl: "",
          contactNumber: "",
          email: "",
        });
        setErrors({});
      } else {
        setFormError(result.error);
      }
    } catch (error) {
      console.error("Error submitting theater:", error);
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
              { id: "name", label: "Name", type: "text", required: true },
              {
                id: "totalSeats",
                label: "Total Seats",
                type: "number",
                required: true,
              },
              { id: "imageUrl", label: "Image URL", type: "text" },
              { id: "contactNumber", label: "Contact Number", type: "text" },
              { id: "email", label: "Email", type: "email" },
            ].map(({ id, label, type, required }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  name={id}
                  type={type}
                  value={theaterData[id]}
                  onChange={handleChange}
                  required={required}
                  aria-invalid={errors[id] ? "true" : "false"}
                />
                {errors[id] && <p className="text-red-500">{errors[id]}</p>}
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-2 gap-x-4 space-y-2">
            <Label>Address</Label>
            {[
              {
                id: "address.street",
                label: "Street",
                type: "text",
                required: true,
              },
            ].map(({ id, label, type, required }) => (
              <div key={id} className="col-span-2 space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  name={id}
                  type={type}
                  value={id.split(".").reduce((o, i) => o[i], theaterData)}
                  onChange={handleChange}
                  required={required}
                  aria-invalid={errors[id] ? "true" : "false"}
                />
                {errors[id] && <p className="text-red-500">{errors[id]}</p>}
              </div>
            ))}
            {[
              {
                id: "address.city",
                label: "City",
                type: "text",
                required: true,
              },
              {
                id: "address.state",
                label: "State",
                type: "text",
                required: true,
              },
              {
                id: "address.zipCode",
                label: "Zip Code",
                type: "text",
                required: true,
              },
              {
                id: "address.country",
                label: "Country",
                type: "text",
                required: true,
              },
            ].map(({ id, label, type, required }) => (
              <div key={id} className="col-span-1 space-y-2">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  name={id}
                  type={type}
                  value={id.split(".").reduce((o, i) => o[i], theaterData)}
                  onChange={handleChange}
                  required={required}
                  aria-invalid={errors[id] ? "true" : "false"}
                />
                {errors[id] && <p className="text-red-500">{errors[id]}</p>}
              </div>
            ))}
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
      <CardFooter className="mx-0 flex flex-row gap-x-2">
        <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting
            ? theater
              ? "Updating..."
              : "Adding..."
            : theater
              ? "Update Theater"
              : "Add Theater"}
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
