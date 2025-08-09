import { User } from "@domain/users/entities/user.entity"

export const USERS_QUERY_REPOSITORY = "USERS_QUERY_REPOSITORY"

export interface IUsersQueryRepository {
  findById(id: string): Promise<User | null>

  findByEmail(email: string): Promise<User | null>

  countByUsername(username: string): Promise<number>
}
