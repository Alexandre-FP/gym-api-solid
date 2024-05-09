import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCrendentialsError } from '@/use-cases/errors/invalid-crendentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true, // incriptado pelo HTTPS
        sameSite: true,
        httpOnly: true, // vai ser possivel ser acessado só pelo back-end nao vai ser possivel ser acessado pelo fron-end
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCrendentialsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
