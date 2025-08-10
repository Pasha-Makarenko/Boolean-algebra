import { Command } from "@nestjs/cqrs"
import { ChangeEmailDto } from "@application/users/dto/change-email.dto"

export class ChangeEmailCommand extends Command<void> {
  constructor(
    public readonly userId: string,
    public readonly dto: ChangeEmailDto
  ) {
    super()
  }
}
