import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCrendentialsError } from './errors/invalid-crendentials-error'

// Unit Test -> test unitarios nunca vai mexer na camada do banco de dados

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Alexandre',
      email: 'xand@xand.com',
      password_hash: await hash('250320', 6),
    })

    const { user } = await sut.execute({
      email: 'xand@xand.com',
      password: '250320',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'xand@xand.com',
        password: '250320',
      }),
    ).rejects.toBeInstanceOf(InvalidCrendentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Alexandre',
      email: 'xand@xand.com',
      password_hash: await hash('250320', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'xand@xand.com',
        password: '25032',
      }),
    ).rejects.toBeInstanceOf(InvalidCrendentialsError)
  })
})
