// src/index.ts
import fastify from 'fastify';

const server = fastify();

server.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const startServer = async () => {
  try {
    await server.listen(3000);
    console.log('Server is running on port 3000');
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();