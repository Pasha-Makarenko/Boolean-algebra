import { Injectable, Scope } from "@nestjs/common"
import { EntityManager } from "@mikro-orm/postgresql"
import { ITransactionsManager } from "@domain/common/managers/transactions.manager"
import { TransactionException } from "@infrastructure/common/exceptions/transaction.exception"

@Injectable({ scope: Scope.REQUEST })
export class TransactionsManager implements ITransactionsManager {
  constructor(private readonly entityManager: EntityManager) {}

  async transaction<T>(
    callback: (entityManager: EntityManager) => Promise<T>
  ): Promise<T> {
    try {
      return await this.entityManager.transactional(
        async (transactionalEm: EntityManager) => {
          return await callback(transactionalEm)
        }
      )
    } catch (error) {
      throw new TransactionException("Transaction failed", error)
    }
  }
}
