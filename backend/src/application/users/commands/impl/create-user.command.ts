import { Command } from "@nestjs/cqrs"
import { CreateUserDto } from "@application/users/dto/create-user.dto"

export class CreateUserCommand extends Command<void> {
  constructor(public readonly dto: CreateUserDto) {
    super()
  }
}
