import { EntitySchema } from "@mikro-orm/core"
import { User } from "@domain/users/entities/user.entity"
import { BaseEntity } from "@domain/common/entities/base.entity"
import { BaseSchema } from "@infrastructure/common/persistance/base.schema"

export const UserSchema = new EntitySchema<User, BaseEntity>({
  class: User,
  extends: BaseSchema,
  tableName: "users",
  properties: {
    ["_name" as "name"]: {
      type: "string",
      length: 255,
      nullable: false,
      fieldName: "name",
      getterName: "name"
    },
    ["_username" as "username"]: {
      type: "string",
      length: 255,
      index: true,
      nullable: false,
      unique: true,
      fieldName: "username",
      getterName: "username"
    },
    ["_email" as "email"]: {
      type: "string",
      length: 255,
      index: true,
      nullable: false,
      unique: true,
      fieldName: "email",
      getterName: "email"
    },
    ["_password" as "password"]: {
      type: "string",
      length: 255,
      nullable: false,
      fieldName: "password",
      getterName: "password"
    },
    ["_confirmed" as "confirmed"]: {
      type: "boolean",
      defaultRaw: "false",
      nullable: false,
      fieldName: "confirmed",
      getterName: "confirmed",
      onCreate: () => false
    }
  }
})
