import { IsEmail, IsString, Matches } from "class-validator"
import { PASSWORD_REGEX } from "@infrastructure/users/consts/regex.const"

export class ChangeEmailDto {
  @IsString()
  @Matches(PASSWORD_REGEX)
  public password: string

  @IsString()
  @IsEmail()
  public email: string
}
