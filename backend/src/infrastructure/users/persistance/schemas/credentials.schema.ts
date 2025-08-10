import { EntitySchema } from "@mikro-orm/core"
import { Credentials } from "@domain/users/value-objects/credentials.value-object"

export const CredentialsSchema = new EntitySchema<Credentials>({
  class: Credentials,
  embeddable: true,
  properties: {
    ["_version" as "version"]: {
      type: "number",
      unsigned: true,
      nullable: false,
      default: 0,
      fieldName: "version",
      getterName: "version"
    },
    ["_lastPassword" as "lastPassword"]: {
      type: "string",
      length: 255,
      default: "",
      nullable: false,
      fieldName: "last_password",
      getterName: "lastPassword"
    },
    ["_passwordChangedAt" as "passwordChangedAt"]: {
      type: "Date",
      nullable: false,
      defaultRaw: "CURRENT_TIMESTAMP",
      fieldName: "password_changed_at",
      getterName: "passwordChangedAt"
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
