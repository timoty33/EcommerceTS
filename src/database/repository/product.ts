import {
  productsStorageTable,
  productsTable,
  productsVariantsTable
} from '@/database/schemas/products';
import type {
  ProductRequest,
  ProductResponse,
  ProductStorageRequest,
  ProductStorageResponse,
  ProductVariantRequest,
  ProductVariantResponse
} from '@/types/product';
import { db } from '../db';

// READ

export async function selectAll(): Promise<ProductResponse[]> {
  const products = await db.select().from(productsTable);
  const productsVariants = await db.select().from(productsVariantsTable);
  const productStorage = await db.select().from(productsStorageTable);

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    starsAverage: product.starsAverage,

    variants: productsVariants
      .filter((variant) => variant.productId === product.id)
      .map((variant) => {
        const storageData = productStorage.find((s) => s.variantId === variant.id);

        return {
          id: variant.id,
          productId: variant.productId,
          price: variant.price,
          isOnSale: variant.isOnSale,
          salePrice: variant.salePrice,
          color: variant.color,
          sizes: variant.sizes,
          tags: variant.tags,
          sku: variant.sku,

          storage: storageData
            ? {
                id: storageData.id,
                variantId: storageData.variantId,
                storage: storageData.storage,
                sizesInStorage: storageData.sizesInStorage ?? []
              }
            : undefined // Se ele não existe da undefined
        };
      })
  }));
}

// CREATE

export async function createProduct(product: ProductRequest): Promise<ProductResponse> {
  const [productInserted] = await db.insert(productsTable).values(product).returning();
  return productInserted;
}

export async function createProductVariant(
  variant: ProductVariantRequest
): Promise<ProductVariantResponse> {
  const [productVariant] = await db.insert(productsVariantsTable).values(variant).returning();
  return productVariant;
}

export async function createProductVariantStorage(
  storage: ProductStorageRequest
): Promise<ProductStorageResponse> {
  const [productVariantStorage] = await db.insert(productsStorageTable).values(storage).returning();
  return productVariantStorage;
}

// UPDATE
//
// export async function update(
//   productToUpdate: ProductResponse,
//   productUpdated: { name: string; price: number }
// ): Promise<ProductResponse> {
//   const [result] = await db
//     .update(productsTable)
//     .set({ name: productUpdated.name, price: String(productUpdated.price) })
//     .where(eq(productsTable.id, productToUpdate.id))
//     .returning();
//
//   if (!result) {
//     throw new Error('Product not found');
//   }
//
//   return {
//     ...result,
//     price: Number(result.price)
//   };
// }
//
// // DELETE
//
// export async function del(productToDelete: ProductResponse) {
//   const result = db
//     .delete(productsTable)
//     .where(eq(productsTable.id, productToDelete.id))
//     .returning();
//   if (!result) {
//     throw new Error('Product not found');
//   }
// }
