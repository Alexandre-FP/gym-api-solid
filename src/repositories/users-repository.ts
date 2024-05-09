import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  // camada para lidar com o banco
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
