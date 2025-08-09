import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { CqrsModule } from "@nestjs/cqrs"
import { MikroOrmModule } from "@mikro-orm/nestjs"
import { UserSchema } from "@infrastructure/users/persistance/schemas/user.schema"
import { InfrastructureModule } from "@main/modules/infrastructure.module"
import {
  IUsersQueryRepository,
  USERS_QUERY_REPOSITORY
} from "@domain/users/repositories/users-query.repository"
import { UsersQueryRepository } from "@infrastructure/users/persistance/repositories/users-query.repository"
import { USERS_COMMAND_REPOSITORY } from "@domain/users/repositories/users-command.repository"
import { UsersCommandRepository } from "@infrastructure/users/persistance/repositories/users-command.repository"
import { USER_FACTORY, UserFactory } from "@domain/users/factories/user.factory"
import {
  ISlugifyService,
  SLUGIFY_SERVICE
} from "@domain/common/services/slugify.service"

const repositories = [
  {
    provide: USERS_QUERY_REPOSITORY,
    useClass: UsersQueryRepository
  },
  {
    provide: USERS_COMMAND_REPOSITORY,
    useClass: UsersCommandRepository
  }
]

const factories = [
  {
    provide: USER_FACTORY,
    useFactory: (
      userQueryRepository: IUsersQueryRepository,
      slugifyService: ISlugifyService
    ) => new UserFactory(userQueryRepository, slugifyService),
    inject: [USERS_QUERY_REPOSITORY, SLUGIFY_SERVICE]
  }
]

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    MikroOrmModule.forFeature([UserSchema]),
    InfrastructureModule
  ],
  providers: [...repositories, ...factories],
  exports: [
    ...repositories.map(r => r.provide),
    ...factories.map(f => f.provide)
  ]
})
export class UsersModule {}
