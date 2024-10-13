import fastify, { FastifyInstance } from 'fastify'

import cors from '@fastify/cors'
import Autoload from '@fastify/autoload'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server: FastifyInstance = fastify({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

server.register(Autoload, {
  dir: join(__dirname, 'routes')
})

await server.register(cors, {})

const start = async () => {
  try {
    await server.listen({ port: 4040 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
