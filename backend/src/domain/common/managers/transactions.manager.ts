export const TRANSACTIONS_MANAGER = "TRANSACTIONS_MANAGER"

export interface ITransactionsManager {
  transaction<T>(callback: (entityManager: unknown) => Promise<T>): Promise<T>
}
