import Fastify, { FastifyInstance } from 'fastify'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import Autoload from '@fastify/autoload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const index: FastifyInstance = Fastify({
  logger: true
})

index.register(Autoload, {
  dir: join(__dirname, 'routes')
})

const start = async () => {
  try {
    await index.listen({ port: 4040 })
  } catch (err) {
    index.log.error(err)
    process.exit(1)
  }
}
start()
