import { FastifyInstance } from 'fastify'

import { Type } from '@sinclair/typebox'
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'

const plugin: FastifyPluginAsyncTypebox = async (fastify: FastifyInstance) => {
  fastify.get('/health', {
    schema: {
      response: {
        200: Type.Object({
          status: Type.String()
        })
      }
    }
  }, async () => {
    return {
      status: 'ok'
    }
  })
}

export default plugin
