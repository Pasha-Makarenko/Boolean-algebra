export interface SerializedException {
  message: string
  details?: unknown
}

export abstract class BaseException extends Error {
  public abstract readonly code: string

  protected constructor(
    message: string,
    public details?: unknown
  ) {
    super(message)
    Object.setPrototypeOf(this, BaseException.prototype)
  }

  serialize() {
    const serialized: SerializedException = {
      message: this.message
    }

    if (this.details) {
      serialized.details = this.details
    }

    return serialized
  }
}
