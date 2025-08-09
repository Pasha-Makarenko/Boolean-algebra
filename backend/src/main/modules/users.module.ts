import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { CqrsModule } from "@nestjs/cqrs"
import { MikroOrmModule } from "@mikro-orm/nestjs"
import { UserSchema } from "@infrastructure/users/persistance/user.schema"

@Module({
  imports: [ConfigModule, CqrsModule, MikroOrmModule.forFeature([UserSchema])]
})
export class UsersModule {}
