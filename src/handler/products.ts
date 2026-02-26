import { Elysia } from 'elysia';

type Product = {
  id: number;
  name: string;
  price: number;
};

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
      summary: 'Get all products',
      tags: ['products']
    }
  }
);
