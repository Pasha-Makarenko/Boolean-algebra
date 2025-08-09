import { ISlugifyService } from "@domain/common/services/slugify.service"
import { IUserQueryRepository } from "@domain/users/repositories/user-query.repository"
import { ConflictException } from "@domain/common/exceptions/conflict.exception"
import { User } from "@domain/users/entities/user.entity"

export class UserFactory {
  constructor(
    private readonly userQueryRepository: IUserQueryRepository,
    private readonly slugifyService: ISlugifyService
  ) {}

  async create(name: string, email: string, password: string) {
    const candidate = await this.userQueryRepository.findByEmail(email)

    if (candidate) {
      throw new ConflictException("Email already exists")
    }

    const username = await this.generateUsername(name)

    return User.create(null, name, username, email, password)
  }

  private async generateUsername(name: string) {
    let username = this.slugifyService.slugify(name)

    const count = await this.userQueryRepository.countByUsername(username)

    if (count > 0) {
      username += count
    }

    return username
  }
}
