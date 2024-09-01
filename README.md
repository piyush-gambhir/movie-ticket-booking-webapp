# QuickNix 🎬

QuickNix is a movie booking web app built for the StarHack hackathon. It leverages modern technologies like Next.js, shadcn, PostgreSQL, and Recoil to provide a seamless and responsive user experience. While we were able to implement most of the required features, the payment and reservation functionalities were not completed due to time constraints.

## Important Links

- **Live Demo**: [https://movie-webapp.vasujain.me](https://movie-webapp.vasujain.me/)
- **GitHub Repository**: [https://github.com/piyush-gambhir/movie-ticket-booking-webapp](https://github.com/piyush-gambhir/movie-ticket-booking-webapp)

## Features

- **Movie Listings**: Browse through a wide selection of movies using data from the TMDB API.
- **Search Functionality**: Quickly find your favorite movies.
- **User Authentication**: Secure login and sign-up features.
- **Movie Details**: Detailed information about each movie, including trailers, ratings, and more.
- **Booking Interface**: Intuitive UI for selecting seats (reservation feature not fully implemented).
- **Admin Panel Authentication**: Secure access to the admin panel for managing movies and bookings.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [shadcn](https://shadcn.dev/), [Recoil](https://recoiljs.org/)
- **Backend**: [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- **Validations:** Zod
- **Database**: [PostgreSQL](https://www.postgresql.org/) via [Neon](https://neon.tech/)
- **Hosting**: [Amazon EC2](https://aws.amazon.com/ec2/)
- **APIs**: [TMDB API](https://www.themoviedb.org/documentation/api)
- **Containerization**: [Docker](https://www.docker.com/)

## Setup Instructions

1. **Clone the repository**:
   git clone https://github.com/your-repo/quicknix.git
   cd quicknix

2. **Install dependencies**:
   pnpm install

3. **Run the development server**:
   pnpm run dev

4. **Environment Variables**:
   - The `.env` file is included in the source code package. There should be no issues setting up the environment.

## Known Issues

- **Payment Integration**: Not implemented.
- **Reservation System**: Not implemented.

---

## Database Schema

### Movies Table

| Column           | Type             | Constraints                                |
| ---------------- | ---------------- | ------------------------------------------ |
| id               | UUID             | Primary Key, Default: `uuid_generate_v4()` |
| imdbId           | VARCHAR(255)     | Unique                                     |
| title            | VARCHAR(255)     | Not Null                                   |
| originalTitle    | VARCHAR(255)     | Not Null                                   |
| backdropPath     | VARCHAR(255)     |                                            |
| posterPath       | VARCHAR(255)     |                                            |
| overview         | TEXT             |                                            |
| releaseDate      | DATE             |                                            |
| popularity       | DOUBLE PRECISION |                                            |
| adult            | BOOLEAN          |                                            |
| mediaType        | VARCHAR(50)      |                                            |
| originalLanguage | VARCHAR(50)      |                                            |
| voteAverage      | DOUBLE PRECISION |                                            |
| voteCount        | INTEGER          |                                            |
| createdAt        | TIMESTAMP        | Default: `now()`                           |
| updatedAt        | TIMESTAMP        | Default: `CURRENT_TIMESTAMP`               |

### Reservations Table

| Column        | Type                                      | Constraints                                |
| ------------- | ----------------------------------------- | ------------------------------------------ |
| id            | UUID                                      | Primary Key, Default: `uuid_generate_v4()` |
| showtimeId    | UUID                                      | Not Null, References: `showtimes.id`       |
| userId        | UUID                                      | Not Null, References: `users.id`           |
| seats         | JSONB                                     | Not Null                                   |
| orderId       | VARCHAR(100)                              | Unique                                     |
| totalPrice    | DECIMAL(10, 2)                            | Not Null                                   |
| customerName  | VARCHAR(100)                              | Not Null                                   |
| customerPhone | VARCHAR(20)                               | Not Null                                   |
| status        | ENUM('pending', 'confirmed', 'cancelled') | Not Null                                   |
| createdAt     | TIMESTAMP                                 | Default: `now()`                           |
| updatedAt     | TIMESTAMP                                 |                                            |

### Showtimes Table

| Column      | Type           | Constraints                                |
| ----------- | -------------- | ------------------------------------------ |
| id          | UUID           | Primary Key, Default: `uuid_generate_v4()` |
| movieId     | UUID           | Not Null, References: `movies.id`          |
| theaterId   | UUID           | Not Null, References: `theaters.id`        |
| ticketPrice | DECIMAL(10, 2) | Not Null                                   |
| startTime   | TIMESTAMP      | Not Null                                   |
| endTime     | TIMESTAMP      | Not Null                                   |
| createdAt   | TIMESTAMP      | Default: `now()`                           |
| updatedAt   | TIMESTAMP      |                                            |

### theaters Table

| Column        | Type         | Constraints                                |
| ------------- | ------------ | ------------------------------------------ |
| id            | UUID         | Primary Key, Default: `uuid_generate_v4()` |
| name          | VARCHAR(255) | Not Null                                   |
| address       | JSONB        | Not Null                                   |
| totalSeats    | INTEGER      | Not Null                                   |
| seats         | JSONB        | Not Null, Default: `[]`                    |
| imageUrl      | VARCHAR(255) |                                            |
| contactNumber | VARCHAR(20)  |                                            |
| email         | VARCHAR(100) |                                            |
| createdAt     | TIMESTAMP    | Default: `now()`                           |
| updatedAt     | TIMESTAMP    | Default: `CURRENT_TIMESTAMP`               |

### Users Table

| Column         | Type                                | Constraints                                |
| -------------- | ----------------------------------- | ------------------------------------------ |
| id             | UUID                                | Primary Key, Default: `uuid_generate_v4()` |
| name           | TEXT                                | Not Null                                   |
| email          | TEXT                                | Unique, Not Null                           |
| emailVerified  | TIMESTAMP                           |                                            |
| image          | TEXT                                |                                            |
| password       | VARCHAR(255)                        |                                            |
| phone          | JSONB                               |                                            |
| dateOfBirth    | TIMESTAMP                           |                                            |
| role           | ENUM('admin', 'user', 'superadmin') | Not Null                                   |
| status         | ENUM('active', 'inactive')          | Not Null, Default: 'active'                |
| gender         | ENUM('male', 'female', 'other')     |                                            |
| marritalStatus | ENUM('single', 'married')           |                                            |
| createdAt      | TIMESTAMP                           | Default: `now()`                           |
| updatedAt      | TIMESTAMP                           |                                            |
