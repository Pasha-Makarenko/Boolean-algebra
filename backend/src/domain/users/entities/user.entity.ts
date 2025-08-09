import { BaseEntity } from "@domain/common/entities/base.entity"
import { ConflictException } from "@domain/common/exceptions/conflict.exception"

export class User extends BaseEntity {
  private _confirmed = false

  constructor(
    id: string | null,
    private _name: string,
    private _username: string,
    private _email: string,
    private _password: string
  ) {
    super(id)
  }

  static create(
    id: string | null,
    name: string,
    username: string,
    email: string,
    password: string
  ): User {
    return new User(id, name, username, email, password)
  }

  get name() {
    return this._name
  }

  get username() {
    return this._username
  }

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }

  get confirmed() {
    return this._confirmed
  }

  confirm() {
    if (this._confirmed) {
      throw new ConflictException("User already confirmed")
    }

    this._confirmed = true
    this.updateTimestamp()
  }
}
