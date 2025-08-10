import { defineConfig } from "@mikro-orm/core"
import { SqlHighlighter } from "@mikro-orm/sql-highlighter"
import { TsMorphMetadataProvider } from "@mikro-orm/reflection"
import { Migrator } from "@mikro-orm/migrations"
import { EntityGenerator } from "@mikro-orm/entity-generator"
import { SeedManager } from "@mikro-orm/seeder"
import { PostgreSqlDriver } from "@mikro-orm/postgresql"
import * as process from "node:process"
import { IdentitySchema } from "@infrastructure/common/persistance/schemas/identity.schema"
import { UserSchema } from "@infrastructure/users/persistance/schemas/user.schema"
import { CredentialsSchema } from "@infrastructure/users/persistance/schemas/credentials.schema"

export default defineConfig({
  driver: PostgreSqlDriver,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB,
  entities: [IdentitySchema, UserSchema, CredentialsSchema],
  debug: process.env.NODE_ENV !== "production",
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: "./migrations",
    pathTs: "./migrations"
  },
  seeder: {
    path: "./seeders",
    pathTs: "./seeders"
  },
  extensions: [Migrator, EntityGenerator, SeedManager]
})
