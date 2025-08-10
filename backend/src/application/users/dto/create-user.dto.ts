import { IsEmail, IsString, Matches } from "class-validator"
import {
  NAME_REGEX,
  PASSWORD_REGEX
} from "@infrastructure/users/consts/regex.const"

export class CreateUserDto {
  @IsString()
  @Matches(NAME_REGEX)
  name: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @Matches(PASSWORD_REGEX)
  password: string
}
