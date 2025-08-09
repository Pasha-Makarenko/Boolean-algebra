import { User } from "@domain/users/entities/user.entity"

export const USER_QUERY_REPOSITORY = "USER_QUERY_REPOSITORY"

export interface IUserQueryRepository {
  findById(id: string): Promise<User | null>

  findByEmail(email: string): Promise<User | null>

  countByUsername(username: string): Promise<number>
}
