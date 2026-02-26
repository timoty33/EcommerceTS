import { logger } from '@bogeychan/elysia-logger';
import { Elysia, t } from 'elysia';

const app = new Elysia();
export default app;

// Middlewares

app.use(
  logger({
    autoLogging: true
  })
);

app.get('/', (ctx) => {
  ctx.log.info(ctx, 'Context');
});

app.get(
  '/double/:number',
  ({ params: { number }, status }) => {
    const n = number * 2;
    return status(200, { number: n });
  },
  {
    params: t.Object({
      number: t.Number()
    })
  }
);
