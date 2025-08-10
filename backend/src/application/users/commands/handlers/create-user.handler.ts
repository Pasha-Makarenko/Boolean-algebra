import { Inject, Logger } from "@nestjs/common"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateUserCommand } from "@application/users/commands/impl/create-user.command"
import {
  IUsersCommandRepository,
  USERS_COMMAND_REPOSITORY
} from "@domain/users/repositories/users-command.repository"
import {
  ITransactionsManager,
  TRANSACTIONS_MANAGER
} from "@domain/common/managers/transactions.manager"
import { USER_FACTORY, UserFactory } from "@domain/users/factories/user.factory"

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  private readonly logger = new Logger(CreateUserHandler.name)

  constructor(
    @Inject(TRANSACTIONS_MANAGER)
    private readonly transactionsManager: ITransactionsManager,
    @Inject(USERS_COMMAND_REPOSITORY)
    private readonly usersCommandRepository: IUsersCommandRepository,
    @Inject(USER_FACTORY)
    private readonly userFactory: UserFactory
  ) {}

  async execute(command: CreateUserCommand) {
    const { name, email, password } = command.dto

    this.logger.log({
      operation: "createUser",
      params: command.dto,
      message: "Creating user"
    })

    const user = await this.userFactory.create(name, email, password)

    await this.transactionsManager.transaction(async entityManager => {
      await this.usersCommandRepository.add(user, entityManager)
    })

    this.logger.log({
      operation: "createUser",
      params: command.dto,
      result: {
        user_id: user.id
      },
      message: "User created successfully"
    })
  }
}
