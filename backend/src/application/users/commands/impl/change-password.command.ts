import { Command } from "@nestjs/cqrs"
import { ChangePasswordDto } from "@application/users/dto/change-password.dto"

export class ChangePasswordCommand extends Command<void> {
  constructor(
    public readonly userId: string,
    public readonly dto: ChangePasswordDto
  ) {
    super()
  }
}
