import { integer, numeric, pgTable, varchar } from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 200 }).notNull(),
  price: numeric({ precision: 10, scale: 2 }).notNull()
});
