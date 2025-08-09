export const SLUGIFY_SERVICE = "SLUGIFY_SERVICE"

export interface ISlugifyService {
  slugify(text: string): string
}
