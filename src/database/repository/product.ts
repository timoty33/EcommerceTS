import { eq, or } from 'drizzle-orm';
import { productsTable } from '@/database/schemas/products';
import type { Product } from '@/types/product';
import { db } from '../db';

// READ

export async function selectAll(): Promise<Product[]> {
  const result = await db.select().from(productsTable);

  return result.map((product) => ({
    ...product,
    price: Number(product.price)
  }));
}

export async function findOne(id?: number, name?: string): Promise<Product | undefined> {
  const result = await db.query.productsTable.findFirst({
    where: or(
      id ? eq(productsTable.id, id) : undefined,
      name ? eq(productsTable.name, name) : undefined
    )
  });

  if (!result) {
    return undefined;
  }

  return {
    ...result,
    price: Number(result.price)
  };
}

export async function findMany(name?: string, price?: number): Promise<Product[] | undefined> {
  const result = await db.query.productsTable.findMany({
    where: or(
      name ? eq(productsTable.name, name) : undefined,
      price ? eq(productsTable.price, String(price)) : undefined
    )
  });

  if (result.length === 0) {
    return undefined;
  }

  return result.map((product) => ({
    ...product,
    price: Number(product.price)
  }));
}

// CREATE

// UPDATE

// DELETE
