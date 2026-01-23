CREATE TABLE "cars" (
	"id" serial PRIMARY KEY NOT NULL,
	"model" varchar(50) NOT NULL,
	"make" varchar(50) NOT NULL,
	"year" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
