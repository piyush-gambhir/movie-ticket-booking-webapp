DO $$ BEGIN
 CREATE TYPE "public"."reservation_status" AS ENUM('pending', 'confirmed', 'cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('admin', 'user', 'superadmin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "movies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"image_url" varchar(255),
	"language" varchar(50),
	"genre" varchar(100),
	"director" varchar(100),
	"trailer_url" varchar(255),
	"description" text,
	"duration" integer,
	"release_date" date NOT NULL,
	"end_date" date,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"showtime_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"seats" jsonb NOT NULL,
	"order_id" varchar(100),
	"total_price" numeric(10, 2) NOT NULL,
	"customer_name" varchar(100) NOT NULL,
	"customer_phone" varchar(20) NOT NULL,
	"status" "reservation_status" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "reservations_order_id_unique" UNIQUE("order_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "showtimes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"movie_id" uuid NOT NULL,
	"theatre_id" uuid NOT NULL,
	"ticket_price" numeric(10, 2) NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "theatres" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" jsonb NOT NULL,
	"total_seats" integer NOT NULL,
	"seats" jsonb NOT NULL,
	"image_url" varchar(255),
	"contact_number" varchar(20),
	"email" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"phone" jsonb,
	"role" "user_role" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD CONSTRAINT "reservations_showtime_id_showtimes_id_fk" FOREIGN KEY ("showtime_id") REFERENCES "public"."showtimes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD CONSTRAINT "reservations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "showtimes" ADD CONSTRAINT "showtimes_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "showtimes" ADD CONSTRAINT "showtimes_theatre_id_theatres_id_fk" FOREIGN KEY ("theatre_id") REFERENCES "public"."theatres"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
