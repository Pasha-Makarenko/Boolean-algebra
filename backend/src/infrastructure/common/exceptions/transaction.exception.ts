import { BaseException } from "@domain/common/exceptions/base.exception"

export const TRANSACTION_EXCEPTION_CODE = "TRANSACTION_ERROR"

export class TransactionException extends BaseException {
  public readonly code = TRANSACTION_EXCEPTION_CODE

  constructor(message = "Transaction failed", details?: unknown) {
    super(message, details)
  }

  serialize() {
    return {
      message: this.message,
      details: this.details
    }
  }
}
