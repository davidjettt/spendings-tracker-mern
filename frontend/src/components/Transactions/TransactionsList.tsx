import axios from 'axios';
import { useState, useEffect } from 'react'
import { ITransactionData } from '../../interfaces/ITransactionData';
import TransactionOptions from './TransactionOptions';

export interface ITransactionsListProps {
}


export default function TransactionsList (props: ITransactionsListProps) {
    const [ transactions, setTransactions ] = useState<ITransactionData[]>([])
    const [ user ] = useState({
        id: localStorage.getItem('id')
    })


    useEffect(() => {
        axios.get(`/api/users/${user.id}/transactions`)
            .then((trans) => {
                setTransactions(trans.data)
            })
    }, [])

  return (
    <div>
        {
            transactions &&
            transactions.map((trans, idx) => (
                <div key={idx}>
                    <span>
                        name: {trans.name}
                    </span>
                    <span>
                        category: {trans.category}
                    </span>
                    <span>
                        amount: {trans.amount}
                    </span>
                    <TransactionOptions transactionId={trans._id} />
                </div>
            ))
        }
    </div>
  );
}
