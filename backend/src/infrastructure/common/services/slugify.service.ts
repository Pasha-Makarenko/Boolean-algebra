import { Injectable } from "@nestjs/common"
import { ISlugifyService } from "@domain/common/services/slugify.service"

@Injectable()
export class SlugifyService implements ISlugifyService {
  slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "")
  }
}
