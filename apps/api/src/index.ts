import fastify, { FastifyInstance } from 'fastify'

import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server: FastifyInstance = fastify({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>()


await server.register(import('@fastify/rate-limit'), {})
await server.register(import('@fastify/cors'), {})

await server.register(import('@fastify/swagger'), {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'API documentation',
      version: '0.1.0'
    },
    tags: [
      { name: 'health', description: 'Health end-points' },
    ],
  }
})

await server.register(import('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
})

await server.register(import('@fastify/autoload'), {
  dir: join(__dirname, 'routes')
})

const start = async () => {
  try {
    await server.listen({ port: 4040 })
    await server.ready()
    await server.swagger()
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
