import { ForbiddenException, Inject, Logger } from "@nestjs/common"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ChangeEmailCommand } from "@application/users/commands/impl/change-email.command"
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
import { ConflictException } from "@domain/common/exceptions/conflict.exception"

@CommandHandler(ChangeEmailCommand)
export class ChangeEmailHandler implements ICommandHandler<ChangeEmailCommand> {
  private readonly logger = new Logger(ChangeEmailHandler.name)

  constructor(
    @Inject(TRANSACTIONS_MANAGER)
    private readonly transactionsManager: ITransactionsManager,
    @Inject(USERS_QUERY_REPOSITORY)
    private readonly usersQueryRepository: IUsersQueryRepository,
    @Inject(HASHER_SERVICE)
    private readonly hasherService: IHasherService
  ) {}

  async execute(command: ChangeEmailCommand) {
    const { password, email } = command.dto

    this.logger.log({
      operationName: "changeEmail",
      params: command,
      message: "Changing user email"
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

    const candidate = await this.usersQueryRepository.findByEmail(email)

    if (candidate) {
      throw new ConflictException(`Email ${email} already in use`)
    }

    await this.transactionsManager.transaction(async () => {
      user.changeEmail(email)
      user.credentials.updateVersion()
    })

    this.logger.log({
      operationName: "changeEmail",
      params: command,
      result: {
        user_id: user.id,
        email: user.email
      },
      message: "User email changed successfully"
    })
  }
}
