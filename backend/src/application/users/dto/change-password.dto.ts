import { IsString, Matches } from "class-validator"
import { PASSWORD_REGEX } from "@infrastructure/users/consts/regex.const"

export class ChangePasswordDto {
  @IsString()
  @Matches(PASSWORD_REGEX)
  public password: string

  @IsString()
  @Matches(PASSWORD_REGEX)
  public newPassword: string
}
