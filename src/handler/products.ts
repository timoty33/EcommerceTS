import { Elysia } from 'elysia';
import type { Product } from '@/types/product';

const items: Product[] = [
  { id: 1, name: 'Apple', price: 2 },
  { id: 2, name: 'Orange', price: 1 }
];

export const products = new Elysia({ prefix: 'products' });

products.get(
  '/all',
  () => {
    return items;
  },
  {
    detail: {
      summary: 'Get all repository',
      tags: ['products']
    }
  }
);
