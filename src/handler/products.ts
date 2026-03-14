import { Elysia, t } from 'elysia';
import * as product from '@/database/repository/product';

export const products = new Elysia({ prefix: 'products' });

products.get(
  '/all',
  () => {
    return product.selectAll();
  },
  {
    detail: {
      summary: 'Get all repository',
      tags: ['products']
    }
  }
);
