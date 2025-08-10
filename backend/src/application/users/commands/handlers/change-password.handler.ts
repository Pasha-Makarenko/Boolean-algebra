import { ForbiddenException, Inject, Logger } from "@nestjs/common"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ChangePasswordCommand } from "@application/users/commands/impl/change-password.command"
import {
  ITransactionsManager,
  TRANSACTIONS_MANAGER
} from "@domain/common/managers/transactions.manager"
import {
  IUsersQueryRepository,
  USERS_QUERY_REPOSITORY
} from "@domain/users/repositories/users-query.repository"
import {
  HASHER_SERVICE,
  IHasherService
} from "@domain/common/services/hasher.service"
import { NotFoundException } from "@domain/common/exceptions/not-found.exceptions"

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  private readonly logger = new Logger(ChangePasswordHandler.name)

  constructor(
    @Inject(TRANSACTIONS_MANAGER)
    private readonly transactionsManager: ITransactionsManager,
    @Inject(USERS_QUERY_REPOSITORY)
    private readonly usersQueryRepository: IUsersQueryRepository,
    @Inject(HASHER_SERVICE)
    private readonly hasherService: IHasherService
  ) {}

  async execute(command: ChangePasswordCommand) {
    const { password, newPassword } = command.dto

    this.logger.log({
      operationName: "changePassword",
      params: command,
      message: "Changing user password"
    })

    const user = await this.usersQueryRepository.findById(command.userId)

    if (!user) {
      throw new NotFoundException(`User by id ${command.userId} not found`)
    }

    const isPasswordValid = await this.hasherService.compare(
      password,
      user.password
    )

    if (!isPasswordValid) {
      throw new ForbiddenException(`Invalid password`)
    }

    const hashedPassword = await this.hasherService.hash(newPassword)

    await this.transactionsManager.transaction(async () => {
      user.changePassword(hashedPassword)
      user.credentials.updateVersion()
    })

    this.logger.log({
      operationName: "changePassword",
      params: command,
      result: {
        user_id: user.id
      },
      message: "User password changed successfully"
    })
  }
}
