export class Credentials {
  private _passwordChangedAt = new Date()
  private _updatedAt = new Date()

  constructor(
    private _version = 0,
    private _lastPassword = ""
  ) {}

  static create(version: number, lastPassword: string) {
    return new Credentials(version, lastPassword)
  }

  get version() {
    return this._version
  }

  get lastPassword() {
    return this._lastPassword
  }

  get passwordChangedAt() {
    return this._passwordChangedAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  updatePassword(newPassword: string) {
    this._lastPassword = newPassword
    this._version += 1
    this._passwordChangedAt = new Date()
    this._updatedAt = new Date()
  }

  updateVersion() {
    this._version += 1
    this._updatedAt = new Date()
  }
}
