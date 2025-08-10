import { BaseException } from "@domain/common/exceptions/base.exception"

export const CONFLICT_EXCEPTION_CODE = "CONFLICT"

export class ConflictException extends BaseException {
  public readonly code = CONFLICT_EXCEPTION_CODE

  constructor(message = "Conflict occurred", details?: unknown) {
    super(message, details)
  }
}
