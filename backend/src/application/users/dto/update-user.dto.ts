import { IsString, Matches, ValidateIf } from "class-validator"
import {
  NAME_REGEX,
  SLUG_REGEX
} from "@infrastructure/users/consts/regex.const"

export class UpdateUserDto {
  @IsString()
  @Matches(SLUG_REGEX)
  @ValidateIf(o => !o.username || o.name)
  public username?: string

  @IsString()
  @Matches(NAME_REGEX)
  @ValidateIf(o => !o.name || o.username)
  public name?: string
}
