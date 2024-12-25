import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

(async () => {
  redisClient.on('error', (err) => console.log('Redis redisClient Error', err));

  await redisClient.connect();
})();

export { redisClient };
