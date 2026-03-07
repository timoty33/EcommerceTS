import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as productsSchema from './schemas/products';

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: { ...productsSchema }
});
