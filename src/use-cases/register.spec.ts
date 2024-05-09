import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistError } from './errors/user-already-exist-error'

// Unit Test -> test unitarios nunca vai mexer na camada do banco de dados

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    // executa antes de cada um dos teste
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should not be able to register', async () => {
    // esse primeiro teste faz um registro do usuario
    const { user } = await sut.execute({
      name: 'Alexandre',
      email: 'xand@xand.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    // esse segundo teste verifica se as senhas esta retornando na funcção compare true

    const { user } = await sut.execute({
      name: 'Alexandre',
      email: 'xand@xand.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    // esse terceiro teste esta verificando o email

    const email = 'xand@xand.com'

    await sut.execute({
      name: 'Alexandre',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Alexandre',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistError)
  })
})
