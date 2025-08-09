import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { CqrsModule } from "@nestjs/cqrs"
import { MikroOrmModule } from "@mikro-orm/nestjs"
import { UserSchema } from "@infrastructure/users/persistance/schemas/user.schema"
import { InfrastructureModule } from "@main/modules/infrastructure.module"

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    MikroOrmModule.forFeature([UserSchema]),
    InfrastructureModule
  ]
})
export class UsersModule {}
