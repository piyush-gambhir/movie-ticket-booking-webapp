This documentation provides a comprehensive guide for the development, deployment, and usage of the Movie Booking Website System. The system is designed to facilitate online movie ticket bookings for cinema theatres in a city, featuring both an admin dashboard and a customer interface.

## Project Overview

The Movie Booking Website System is designed to manage movie bookings for multiple theatres in a city. It includes the following functionalities:

- Online booking system for customers.
- Admin dashboard for managing movies, theatres, showtimes, reservations, and users.
- User authentication and profile management.
- Integration with a dummy payment gateway for handling payments.

## Technology Stack

- **Language:** JavaScript
- **Validations:** Zod
- **FrontEnd/BackEnd Framework:** Next.js
- **Authentication:** Auth.js
- **Database:** PostgreSQL
- **ORM:** Drizzle
- **UI Libraries:** ShadCN
- **State Management:** Recoil
- **Object Storage:** AWS / Cloudflare R2
- **Containerization:** Docker
- **Hosting:** AWS / Cloudflare Pages
- **Payments:** RazorPay
- **Email Services:** Resend / MailGun
  Optional
- **Caching:** Redis
- **OTP:** (Optional)
- **Multilingual Support:** (Optional)
- **CI/CD:** GitHub Actions / SST (Optional)
- **Maps:** OLA (Optional)

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
