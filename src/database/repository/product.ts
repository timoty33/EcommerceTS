import { eq, sql } from 'drizzle-orm';
import {
  productsStorageTable,
  productsTable,
  productsVariantsTable
} from '@/database/schemas/products';
import type {
  Product,
  ProductRequest,
  ProductStorage,
  ProductStorageRequest,
  ProductVariant,
  ProductVariantRequest
} from '@/types/product';
import { db } from '../db';

// --- READ ---
export async function selectAll(): Promise<Product[]> {
  const products = await db.select().from(productsTable);
  const productsVariants = await db.select().from(productsVariantsTable);
  const productsStorage = await db.select().from(productsStorageTable);

  return products.map((product) => ({
    ...product,
    variants: productsVariants
      .filter((v) => v.productId === product.id)
      .map((variant) => ({
        ...variant,
        // Agora filtramos todos os tamanhos que pertencem a esta variante específica
        storage: productsStorage
          .filter((s) => s.variantId === variant.id)
          .map((s) => ({
            id: s.id,
            variantId: s.variantId,
            storage: s.storage,
            size: s.size
          }))
      }))
  })) as Product[];
}

// --- CREATE ---
export async function createProduct(product: ProductRequest): Promise<Product> {
  const [productInserted] = await db.insert(productsTable).values(product).returning();
  return productInserted as Product;
}

export async function createProductVariant(
  variant: ProductVariantRequest
): Promise<ProductVariant> {
  const [productVariant] = await db.insert(productsVariantsTable).values(variant).returning();
  return productVariant as ProductVariant;
}

export async function createProductVariantStorage(
  storage: ProductStorageRequest
): Promise<ProductStorage> {
  const [productVariantStorage] = await db.insert(productsStorageTable).values(storage).returning();
  return productVariantStorage as ProductStorage;
}

// --- UPDATE ---

export async function updateProduct(
  oldProductId: number,
  newProduct: ProductRequest
): Promise<Product> {
  const [productInserted] = await db
    .update(productsTable)
    .set(newProduct)
    .where(eq(productsTable.id, oldProductId))
    .returning();
  return productInserted as Product;
}

export async function updateProductVariant(
  oldVariantId: number,
  newVariant: ProductVariantRequest
): Promise<ProductVariant> {
  const [productVariant] = await db
    .update(productsVariantsTable)
    .set(newVariant)
    .where(eq(productsVariantsTable.id, oldVariantId))
    .returning();
  return productVariant as ProductVariant;
}

export async function updateProductVariantStorage(
  oldStorageId: number,
  newStorage: ProductStorageRequest
): Promise<ProductStorage> {
  const [productVariantStorage] = await db
    .update(productsStorageTable)
    .set(newStorage)
    .where(eq(productsStorageTable.id, oldStorageId))
    .returning();
  return productVariantStorage as ProductStorage;
}

export async function purchaseItem(storageId: number): Promise<ProductStorage> {
  return await db.transaction(async (tx) => {
    const [item] = await tx
      .select()
      .from(productsStorageTable)
      .where(eq(productsStorageTable.id, storageId))
      .limit(1);

    if (!item) {
      throw new Error('Item not found');
    }

    if (item.storage <= 0) {
      throw new Error(`No storage for ${item.size}.`);
    }

    const [updatedStorage] = await tx
      .update(productsStorageTable)
      .set({
        storage: sql`${productsStorageTable.storage} - 1`
      })
      .where(eq(productsStorageTable.id, storageId))
      .returning();

    return updatedStorage as ProductStorage;
  });
}
