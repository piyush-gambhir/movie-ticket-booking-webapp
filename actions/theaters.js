"use server";

import { z } from "zod";

import {
  addTheaterSchema,
  theaterSearchSchema,
  deleteTheaterSchema,
  updateTheaterSchema,
} from "@/lib/zod/theaters";

export async function getTheaters({
  query = "",
  page = 1,
  limit = 10,
  sort = "name",
  order = "asc",
}) {
  try {
    const theatreSearchParams = theaterSearchSchema.parse({
      query,
      page,
      limit,
      sort,
      order,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/theater?${new URLSearchParams({
        query: theatreSearchParams.query,
        page: theatreSearchParams.page.toString(),
        limit: theatreSearchParams.limit.toString(),
        sort: theatreSearchParams.sort,
        order: theatreSearchParams.order,
      })}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to retrieve theaters.",
      };
    }

    const theaters = await response.json();
    return {
      success: true,
      data: {
        theaters: theaters.data,
        pagination: theaters.pagination,
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: error.message };
  }
}

export async function getTheater({ theaterId }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/theater/${theaterId}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to retrieve theater.",
      };
    }

    const theater = await response.json();
    return { success: true, data: theater };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function addTheater({ theaterData }) {
  try {
    const validatedData = addTheaterSchema.parse(theaterData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/theater`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to add theater.",
      };
    }

    const newTheater = await response.json();
    return { success: true, data: newTheater };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: error.message };
  }
}

export async function updateTheater({ theaterData }) {
  try {
    const validatedData = updateTheaterSchema.parse(theaterData);

    if (!validatedData.id) {
      throw new Error("Theater ID is required for updates.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/theater/${validatedData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to update theater.",
      };
    }

    const updatedTheater = await response.json();
    return { success: true, data: updatedTheater };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: error.message };
  }
}

export async function deleteTheater({ theaterId }) {
  try {
    const validatedData = deleteTheaterSchema.parse({ id: theaterId });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/theatres/${theaterId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to delete theater.",
      };
    }

    const message = await response.json().then((data) => data.message);
    return { success: true, message: message };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: error.message };
  }
}
