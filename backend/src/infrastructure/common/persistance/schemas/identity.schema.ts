import { EntitySchema } from "@mikro-orm/core"
import { Identity } from "@domain/common/entities/identity.entity"

export const IdentitySchema = new EntitySchema<Identity>({
  class: Identity,
  abstract: true,
  properties: {
    ["_id" as "id"]: {
      type: "uuid",
      primary: true,
      nullable: false,
      defaultRaw: "gen_random_uuid()",
      fieldName: "id",
      getterName: "id"
    }
  }
})
