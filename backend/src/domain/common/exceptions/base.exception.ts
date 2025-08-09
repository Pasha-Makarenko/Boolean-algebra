export interface SerializedException {
  message: string
  details?: unknown
}

export abstract class BaseException extends Error {
  public abstract readonly code: string

  protected constructor(
    message: string,
    protected details?: unknown
  ) {
    super(message)
    Object.setPrototypeOf(this, BaseException.prototype)
  }

  abstract serialize(): SerializedException
}
