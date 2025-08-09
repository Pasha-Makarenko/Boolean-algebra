import { Module } from "@nestjs/common"
import { SLUGIFY_SERVICE } from "@domain/common/services/slugify.service"
import { SlugifyService } from "@infrastructure/common/services/slugify.service"
import { TransactionsManager } from "@infrastructure/common/persistance/managers/transactions.manager"
import { TRANSACTIONS_MANAGER } from "@domain/common/managers/transactions.manager"

@Module({
  providers: [
    {
      provide: TRANSACTIONS_MANAGER,
      useClass: TransactionsManager
    },
    {
      provide: SLUGIFY_SERVICE,
      useClass: SlugifyService
    }
  ],
  exports: [SLUGIFY_SERVICE]
})
export class InfrastructureModule {}
