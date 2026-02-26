import { Elysia } from 'elysia';

export const logger = new Elysia({ name: 'logger' });

logger.onRequest(() => {
  logger.state('start', performance.now());
});

logger.onAfterHandle(({ store: { start }, set, request }) => {
  const now = performance.now();

  const time = now - start;

  console.log(`
  
    [ ${set.status} ] - [ ${request.method} ] ${request.url}
    time: ${time.toFixed(1)}ms
    
  `);
});
