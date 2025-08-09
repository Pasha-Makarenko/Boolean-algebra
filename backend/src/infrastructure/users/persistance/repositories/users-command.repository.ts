import { Injectable } from "@nestjs/common"
import { EntityManager } from "@mikro-orm/postgresql"
import { IUsersCommandRepository } from "@domain/users/repositories/users-command.repository"
import { User } from "@domain/users/entities/user.entity"

@Injectable()
export class UsersCommandRepository implements IUsersCommandRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async add(user: User, entityManager?: EntityManager) {
    const em = entityManager || this.entityManager
    em.persist(user)
  }

  async delete(user: User, entityManager?: EntityManager) {
    const em = entityManager || this.entityManager
    em.remove(user)
  }
}
