import { ITransactionData } from "./ITransactionData"

export interface ICategoryTotalWithTransactions {
    total: number
    transactions: ITransactionData[]
    category: string
}
