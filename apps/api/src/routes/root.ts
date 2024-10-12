import { FastifyInstance } from 'fastify'

const plugin = async (fastify: FastifyInstance) => {
  fastify.get('/health', async () => {
    return {
      status: 'ok'
    }
  })
}

export default plugin
