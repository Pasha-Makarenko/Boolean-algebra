import { EntitySchema } from "@mikro-orm/core"
import { User } from "@domain/users/entities/user.entity"
import { Identity } from "@domain/common/entities/identity.entity"
import { IdentitySchema } from "@infrastructure/common/persistance/schemas/identity.schema"

export const UserSchema = new EntitySchema<User, Identity>({
  class: User,
  extends: IdentitySchema,
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
      getterName: "confirmed"
    },
    ["_credentials" as "credentials"]: {
      kind: "embedded",
      entity: "Credentials"
    },
    ["_createdAt" as "createdAt"]: {
      type: "Date",
      nullable: false,
      defaultRaw: "CURRENT_TIMESTAMP",
      fieldName: "created_at",
      getterName: "createdAt"
    },
    ["_updatedAt" as "updatedAt"]: {
      type: "Date",
      nullable: false,
      defaultRaw: "CURRENT_TIMESTAMP",
      fieldName: "updated_at",
      getterName: "updatedAt"
    }
  }
})
