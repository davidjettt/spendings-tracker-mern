export interface ITransactionData {
    _id: string,
    name: string,
    category: string,
    date: string,
    amount: number,
    notes: string,
    userId: string | null
  }
