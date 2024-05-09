import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { ValidateCheckinUseCase } from './validate-check-in'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
// Unit Test -> test unitarios nunca vai mexer na camada do banco de dados

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckinUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    // executa antes de cada um dos teste
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckinUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    // console.log(createdCheckIn.created_at)

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 14))

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
