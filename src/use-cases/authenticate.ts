import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCrendentialsError } from './errors/invalid-crendentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCrendentialsError()
    }

    const doesPasswordMatchs = await compare(password, user.password_hash) // Boolean clean code => nome de variaveis como "is" "has" "does"

    if (!doesPasswordMatchs) {
      throw new InvalidCrendentialsError()
    }

    return {
      user,
    }
  }
}
