import { boolean, integer, jsonb, numeric, pgTable, real, varchar } from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 200 }).notNull(),
  description: varchar({ length: 200 }),
  starsAverage: real().notNull().default(4.5)
});

export const productsVariantsTable = pgTable('products_variants', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  productId: integer()
    .notNull()
    .references(() => productsTable.id),
  price: numeric({ precision: 10, scale: 2 }).notNull(),
  isOnSale: boolean().default(false).notNull(),
  salePrice: numeric({ precision: 10, scale: 2 }),
  color: varchar({ length: 255 }).notNull(),
  sizes: varchar({ length: 255 }).array().notNull(),
  tags: jsonb(),
  sku: varchar({ length: 255 })
});

export const productsStorageTable = pgTable('products_storage', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  variantId: integer()
    .notNull()
    .references(() => productsVariantsTable.id),
  storage: integer().notNull().default(0),
  sizesInStorage: varchar({ length: 255 }).array()
});
