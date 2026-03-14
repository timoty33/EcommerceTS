import { type Static, t } from 'elysia';

// --- STORAGE ---
const ProductStorageSchema = t.Object({
  id: t.Number(),
  variantId: t.Number(),
  storage: t.Number(),
  size: t.String()
});

const ProductStorageRequestSchema = t.Omit(ProductStorageSchema, ['id']);

// --- VARIANTS ---
const ProductVariantSchema = t.Object({
  id: t.Number(),
  productId: t.Number(),
  price: t.String(),
  isOnSale: t.Boolean(),
  salePrice: t.Nullable(t.String()),
  color: t.String(),
  sizes: t.Array(t.String()),
  tags: t.Nullable(t.Any()),
  sku: t.Nullable(t.String()),
  storage: t.Optional(t.Array(ProductStorageSchema))
});

const ProductVariantRequestSchema = t.Omit(ProductVariantSchema, ['id', 'storage']);

// --- PRODUCT ---
const ProductSchema = t.Object({
  id: t.Number(),
  name: t.String(),
  description: t.Nullable(t.String()),
  starsAverage: t.Number({ default: 4.5 }),
  variants: t.Optional(t.Array(ProductVariantSchema))
});

const ProductRequestSchema = t.Omit(ProductSchema, ['id', 'variants']);

// --- TYPES ---

export type Product = Static<typeof ProductSchema>;
export type ProductRequest = Static<typeof ProductRequestSchema>;
export type ProductStorage = Static<typeof ProductStorageSchema>;
export type ProductStorageRequest = Static<typeof ProductStorageRequestSchema>;
export type ProductVariant = Static<typeof ProductVariantSchema>;
export type ProductVariantRequest = Static<typeof ProductVariantRequestSchema>;
