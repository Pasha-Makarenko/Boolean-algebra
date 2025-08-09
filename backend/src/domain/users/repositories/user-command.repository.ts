import { User } from "@domain/users/entities/user.entity"

export const USER_COMMAND_REPOSITORY = "USER_COMMAND_REPOSITORY"

export interface IUserCommandRepository {
  add(user: User, entityManager?: unknown): Promise<void>

  delete(user: User, entityManager?: unknown): Promise<void>
}
