import { EntitySchema } from "@mikro-orm/core"
import { BaseEntity } from "@domain/common/entities/base.entity"

export const BaseSchema = new EntitySchema<BaseEntity>({
  class: BaseEntity,
  abstract: true,
  properties: {
    ["_id" as "id"]: {
      type: "uuid",
      primary: true,
      nullable: false,
      defaultRaw: "gen_random_uuid()",
      fieldName: "id",
      getterName: "id"
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
