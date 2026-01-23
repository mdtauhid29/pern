
import { integer, varchar, pgTable, serial, text, timestamp, numeric } from 'drizzle-orm/pg-core';

export const cars = pgTable('cars', {
  id: serial('id').primaryKey(),
  model: varchar('model', { length: 50}).notNull(),
  make: varchar('make', { length:50}).notNull(),
  year: integer('year').notNull(),
  price: numeric('price', { precision:10, scale: 2}).notNull(),
  created_at: timestamp('created_at').defaultNow(),
});