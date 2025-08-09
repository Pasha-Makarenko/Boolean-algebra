import { Injectable } from "@nestjs/common"
import { compare, hash } from "bcryptjs"
import { IHasherService } from "@domain/common/services/hasher.service"

@Injectable()
export class HasherService implements IHasherService {
  async hash(value: string) {
    return await hash(value, 10)
  }

  async compare(value: string, hashedValue: string) {
    return await compare(value, hashedValue)
  }
}
