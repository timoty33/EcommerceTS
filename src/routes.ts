import { openapi } from '@elysiajs/openapi';
import { Elysia } from 'elysia';
import { Logestic } from 'logestic';
import { products } from '$/products';

const app = new Elysia();
export default app;

// Middlewares

const logger = Logestic.preset('fancy');
app.use(logger);

app.use(openapi({ path: '/openapi' }));

// Routes

app.get('/', () => 'Pong', {
  detail: {
    summary: 'Home Page',
    tags: ['home']
  }
});

app.use(products);
