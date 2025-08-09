import { Injectable } from "@nestjs/common"
import { EntityManager } from "@mikro-orm/postgresql"
import { IUsersQueryRepository } from "@domain/users/repositories/users-query.repository"
import { User } from "@domain/users/entities/user.entity"

@Injectable()
export class UsersQueryRepository implements IUsersQueryRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async findById(
    id: string,
    entityManager?: EntityManager
  ): Promise<User | null> {
    const em = entityManager || this.entityManager
    return em.findOne(User, {
      ["_id" as "id"]: id
    })
  }

  async findByEmail(
    email: string,
    entityManager?: EntityManager
  ): Promise<User | null> {
    const em = entityManager || this.entityManager
    return em.findOne(User, {
      ["_email" as "email"]: email
    })
  }

  async countByUsername(
    username: string,
    entityManager?: EntityManager
  ): Promise<number> {
    const em = entityManager || this.entityManager
    return em.count(User, {
      ["_username" as "username"]: username
    })
  }
}
