# QuickNix 🎬

QuickNix is a movie booking web app built for the StarHack hackathon. It leverages modern technologies like Next.js, shadcn, PostgreSQL, and Recoil to provide a seamless and responsive user experience. While we were able to implement most of the required features, the payment and reservation functionalities were not completed due to time constraints.

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

### Table: users

| Column     | Type                                | Constraints      |
| ---------- | ----------------------------------- | ---------------- |
| id         | UUID                                | Primary Key      |
| name       | VARCHAR(255)                        | Not Null         |
| email      | VARCHAR(255)                        | Unique, Not Null |
| password   | VARCHAR(255)                        | Not Null         |
| phone      | JSONB                               |                  |
| role       | ENUM('admin', 'user', 'superadmin') | Not Null         |
| created_at | TIMESTAMP                           | Default: `now()` |
| updated_at | TIMESTAMP                           |                  |

### Table: movies

| Column       | Type         | Constraints      |
| ------------ | ------------ | ---------------- |
| id           | UUID         | Primary Key      |
| title        | VARCHAR(255) | Not Null         |
| image_url    | VARCHAR(255) |                  |
| language     | VARCHAR(50)  |                  |
| genre        | VARCHAR(100) |                  |
| director     | VARCHAR(100) |                  |
| trailer_url  | VARCHAR(255) |                  |
| description  | TEXT         |                  |
| duration     | INTEGER      |                  |
| release_date | DATE         | Not Null         |
| end_date     | DATE         |                  |
| created_at   | TIMESTAMP    | Default: `now()` |
| updated_at   | TIMESTAMP    |                  |

### Table: theatres

| Column         | Type         | Constraints      |
| -------------- | ------------ | ---------------- |
| id             | UUID         | Primary Key      |
| name           | VARCHAR(255) | Not Null         |
| address        | JSONB        | Not Null         |
| total_seats    | INTEGER      | Not Null         |
| seats          | JSONB        | Not Null         |
| image_url      | VARCHAR(255) |                  |
| contact_number | VARCHAR(20)  |                  |
| email          | VARCHAR(100) |                  |
| created_at     | TIMESTAMP    | Default: `now()` |
| updated_at     | TIMESTAMP    |                  |

### Table: showtimes

| Column       | Type          | Constraints                        |
| ------------ | ------------- | ---------------------------------- |
| id           | UUID          | Primary Key                        |
| movie_id     | UUID          | Foreign Key: movies.id, Not Null   |
| theatre_id   | UUID          | Foreign Key: theatres.id, Not Null |
| ticket_price | DECIMAL(10,2) | Not Null                           |
| start_time   | TIMESTAMP     | Not Null                           |
| end_time     | TIMESTAMP     | Not Null                           |
| created_at   | TIMESTAMP     | Default: `now()`                   |
| updated_at   | TIMESTAMP     |                                    |

### Table: reservations

| Column         | Type                                      | Constraints                         |
| -------------- | ----------------------------------------- | ----------------------------------- |
| id             | UUID                                      | Primary Key                         |
| showtime_id    | UUID                                      | Foreign Key: showtimes.id, Not Null |
| user_id        | UUID                                      | Foreign Key: users.id, Not Null     |
| seats          | JSONB                                     | Not Null                            |
| order_id       | VARCHAR(100)                              | Unique                              |
| total_price    | DECIMAL(10,2)                             | Not Null                            |
| customer_name  | VARCHAR(100)                              | Not Null                            |
| customer_phone | VARCHAR(20)                               | Not Null                            |
| status         | ENUM('pending', 'confirmed', 'cancelled') | Not Null                            |
| created_at     | TIMESTAMP                                 | Default: `now()`                    |
| updated_at     | TIMESTAMP                                 |                                     |

### Table: transactions

| Column         | Type                                                            | Constraints                            |
| -------------- | --------------------------------------------------------------- | -------------------------------------- |
| id             | UUID                                                            | Primary Key                            |
| reservation_id | UUID                                                            | Foreign Key: reservations.id, Not Null |
| payment_id     | VARCHAR(100)                                                    | Unique                                 |
| gateway        | VARCHAR(100)                                                    |                                        |
| amount         | DECIMAL(10,2)                                                   | Not Null                               |
| currency       | CHAR(3)                                                         | Not Null                               |
| status         | ENUM('created', 'authorized', 'captured', 'refunded', 'failed') | Not Null                               |
| created_at     | TIMESTAMP                                                       | Default: `now()`                       |
| updated_at     | TIMESTAMP                                                       |                                        |
