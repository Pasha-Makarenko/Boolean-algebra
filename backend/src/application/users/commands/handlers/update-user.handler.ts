import { Inject, Logger } from "@nestjs/common"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { UpdateUserCommand } from "@application/users/commands/impl/update-user.command"
import {
  ITransactionsManager,
  TRANSACTIONS_MANAGER
} from "@domain/common/managers/transactions.manager"
import {
  IUsersQueryRepository,
  USERS_QUERY_REPOSITORY
} from "@domain/users/repositories/users-query.repository"
import { NotFoundException } from "@domain/common/exceptions/not-found.exceptions"
import { ConflictException } from "@domain/common/exceptions/conflict.exception"

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  private readonly logger = new Logger(UpdateUserHandler.name)

  constructor(
    @Inject(TRANSACTIONS_MANAGER)
    private readonly transactionsManager: ITransactionsManager,
    @Inject(USERS_QUERY_REPOSITORY)
    private readonly usersQueryRepository: IUsersQueryRepository
  ) {}

  async execute(command: UpdateUserCommand) {
    const { name, username } = command.dto

    this.logger.log({
      operationName: "updateUser",
      params: command,
      message: "Updating user"
    })

    const user = await this.usersQueryRepository.findById(command.userId)

    if (!user) {
      throw new NotFoundException(`User by id ${command.userId} not found`)
    }

    await this.transactionsManager.transaction(async () => {
      if (name) {
        user.changeName(name)
      }

      if (username) {
        const candidate =
          await this.usersQueryRepository.findByUsername(username)

        if (candidate) {
          throw new ConflictException(`Username ${username} is already taken`)
        }

        user.changeUsername(username)
      }
    })

    this.logger.log({
      operationName: "updateUser",
      params: command,
      result: {
        user_id: user.id
      },
      message: "User updated successfully"
    })
  }
}
