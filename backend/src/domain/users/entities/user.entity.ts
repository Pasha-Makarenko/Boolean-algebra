import { Identity } from "@domain/common/entities/identity.entity"
import { Credentials } from "@domain/users/value-objects/credentials.value-object"
import { ConflictException } from "@domain/common/exceptions/conflict.exception"

export class User extends Identity {
  private _confirmed = false
  private _credentials = new Credentials()
  private _createdAt = new Date()
  private _updatedAt = new Date()

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

  get credentials() {
    return this._credentials
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  confirm() {
    if (this._confirmed) {
      throw new ConflictException("User already confirmed")
    }

    this._confirmed = true
    this._updatedAt = new Date()
  }
}
