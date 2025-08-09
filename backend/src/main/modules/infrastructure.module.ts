import { Module } from "@nestjs/common"
import { SLUGIFY_SERVICE } from "@domain/common/services/slugify.service"
import { SlugifyService } from "@infrastructure/common/services/slugify.service"

@Module({
  providers: [
    {
      provide: SLUGIFY_SERVICE,
      useClass: SlugifyService
    }
  ],
  exports: [SLUGIFY_SERVICE]
})
export class InfrastructureModule {}
