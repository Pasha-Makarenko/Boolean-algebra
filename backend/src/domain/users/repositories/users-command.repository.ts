import { User } from "@domain/users/entities/user.entity"

export const USERS_COMMAND_REPOSITORY = "USERS_COMMAND_REPOSITORY"

export interface IUsersCommandRepository {
  add(user: User, entityManager?: unknown): Promise<void>

  delete(user: User, entityManager?: unknown): Promise<void>
}
