import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

import { users } from "./schemas/users.schema.js";
import { movies } from "./schemas/movies.schema.js";
import { theaters } from "./schemas/theaters.schema.js";
import { showtimes } from "./schemas/showtimes.schema.js";
import { reservations } from "./schemas/reservations.schema.js";

dotenv.config({ path: "../../.env" });

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env.development");

const main = async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  console.log("Seed start");

  // Seed Users
  const userData = [];
  for (let i = 0; i < 20; i++) {
    userData.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: JSON.stringify({ number: faker.phone.number() }),
      role: faker.helpers.arrayElement(["admin", "user", "superadmin"]),
    });
  }
  await db.insert(users).values(userData);
  console.log("Users seeded");

  // Seed Movies
  const movieData = [];
  for (let i = 0; i < 10; i++) {
    movieData.push({
      title: faker.music.songName(),
      imageUrl: faker.image.url(),
      language: faker.helpers.arrayElement([
        "English",
        "Spanish",
        "French",
        "German",
      ]),
      genre: faker.helpers.arrayElement([
        "Action",
        "Comedy",
        "Drama",
        "Sci-Fi",
      ]),
      director: faker.person.fullName(),
      trailerUrl: faker.internet.url(),
      description: faker.lorem.paragraph(),
      duration: faker.number.int({ min: 60, max: 180 }),
      releaseDate: faker.date.past(),
      endDate: faker.date.future(),
    });
  }
  await db.insert(movies).values(movieData);
  console.log("Movies seeded");

  // Seed theaters
  const theatreData = [];
  for (let i = 0; i < 5; i++) {
    theatreData.push({
      name: faker.company.name() + " Theatre",
      address: JSON.stringify({
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
      }),
      totalSeats: faker.number.int({ min: 50, max: 200 }),
      seats: JSON.stringify(
        Array.from(
          { length: faker.number.int({ min: 50, max: 200 }) },
          (_, i) => ({
            number: i + 1,
            type: faker.helpers.arrayElement(["regular", "vip"]),
          }),
        ),
      ),
      imageUrl: faker.image.url(),
      contactNumber: faker.phone.number(),
      email: faker.internet.email(),
    });
  }
  await db.insert(theaters).values(theatreData);
  console.log("theaters seeded");

  // Seed Showtimes
  const showtimeData = [];
  const seededMovies = await db.select().from(movies);
  const seededtheaters = await db.select().from(theaters);
  for (let i = 0; i < 30; i++) {
    const startTime = faker.date.future();
    showtimeData.push({
      movieId: faker.helpers.arrayElement(seededMovies).id,
      theatreId: faker.helpers.arrayElement(seededtheaters).id,
      ticketPrice: parseFloat(
        faker.commerce.price({ min: 5, max: 20, dec: 2 }),
      ),
      startTime: startTime,
      endTime: new Date(startTime.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
    });
  }
  await db.insert(showtimes).values(showtimeData);
  console.log("Showtimes seeded");

  // Seed Reservations
  const reservationData = [];
  const seededShowtimes = await db.select().from(showtimes);
  const seededUsers = await db.select().from(users);
  for (let i = 0; i < 50; i++) {
    reservationData.push({
      showtimeId: faker.helpers.arrayElement(seededShowtimes).id,
      userId: faker.helpers.arrayElement(seededUsers).id,
      seats: JSON.stringify(
        Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
          faker.number.int({ min: 1, max: 100 }),
        ),
      ),
      orderId: faker.string.uuid(),
      totalPrice: parseFloat(
        faker.commerce.price({ min: 20, max: 100, dec: 2 }),
      ),
      customerName: faker.person.fullName(),
      customerPhone: faker.phone.number(),
      status: faker.helpers.arrayElement(["pending", "confirmed", "cancelled"]),
    });
  }
  await db.insert(reservations).values(reservationData);
  console.log("Reservations seeded");

  console.log("Seed done");
  await pool.end();
};

main().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
