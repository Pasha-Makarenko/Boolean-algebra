export class BaseEntity {
  private _createdAt = new Date()
  private _updatedAt = new Date()

  constructor(protected _id: string | null) {}

  get id() {
    return this._id
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._updatedAt
  }

  protected updateTimestamp() {
    this._updatedAt = new Date()
  }
}
