import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = createCheckInParamsSchema.parse(request.params)

  const valaidateCheckInUseCase = makeValidateCheckInUseCase()

  await valaidateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send() // httpCode 204 -> uma resposta vazia
}
