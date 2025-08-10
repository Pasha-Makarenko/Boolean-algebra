import { BaseException } from "@domain/common/exceptions/base.exception"

export const FORBIDDEN_EXCEPTION_CODE = "FORBIDDEN"
export class ForbiddenException extends BaseException {
  public readonly code = FORBIDDEN_EXCEPTION_CODE

  constructor(message = "Forbidden access", details?: unknown) {
    super(message, details)
  }
}
