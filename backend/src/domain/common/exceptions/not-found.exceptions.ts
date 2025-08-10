import { BaseException } from "@domain/common/exceptions/base.exception"

export const NOT_FOUND_EXCEPTION_CODE = "NOT_FOUND"

export class NotFoundException extends BaseException {
  public readonly code = NOT_FOUND_EXCEPTION_CODE

  constructor(message = "Resource not found", details?: unknown) {
    super(message, details)
  }
}
