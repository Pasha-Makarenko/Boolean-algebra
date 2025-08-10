import { Command } from "@nestjs/cqrs"
import { UpdateUserDto } from "@application/users/dto/update-user.dto"

export class UpdateUserCommand extends Command<void> {
  constructor(
    public readonly userId: string,
    public readonly dto: UpdateUserDto
  ) {
    super()
  }
}
