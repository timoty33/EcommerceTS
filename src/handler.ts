import { Elysia, t } from 'elysia';
import { logger } from './logger';

const app = new Elysia();
export default app;

app.use(logger);

app.get('/', () => 'Pong');

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
