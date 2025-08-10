export class Identity {
  constructor(protected _id: string | null) {}

  get id() {
    return this._id
  }
}
