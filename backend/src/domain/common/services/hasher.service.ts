export const HASHER_SERVICE = "HASHER_SERVICE"

export interface IHasherService {
  hash(value: string): Promise<string>

  compare(value: string, hashedValue: string): Promise<boolean>
}
