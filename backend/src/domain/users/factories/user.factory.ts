import { ISlugifyService } from "@domain/common/services/slugify.service"
import { IUsersQueryRepository } from "@domain/users/repositories/users-query.repository"
import { ConflictException } from "@domain/common/exceptions/conflict.exception"
import { User } from "@domain/users/entities/user.entity"

export const USER_FACTORY = "USER_FACTORY"

export class UserFactory {
  constructor(
    private readonly usersQueryRepository: IUsersQueryRepository,
    private readonly slugifyService: ISlugifyService
  ) {}

  async create(name: string, email: string, password: string) {
    const candidate = await this.usersQueryRepository.findByEmail(email)

    if (candidate) {
      throw new ConflictException("Email already exists")
    }

    const username = await this.generateUsername(name)

    return User.create(null, name, username, email, password)
  }

  private async generateUsername(name: string) {
    let username = this.slugifyService.slugify(name)

    const count = await this.usersQueryRepository.countByUsername(username)

    if (count > 0) {
      username += count
    }

    return username
  }
}
