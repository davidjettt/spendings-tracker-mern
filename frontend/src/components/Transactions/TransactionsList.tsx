import axios from 'axios';
import { useState, useEffect } from 'react'
import { ITransactionData } from '../../interfaces/ITransactionData';
import TransactionOptions from './TransactionOptions';
import 'date-fns'

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

    console.log('Transactions list', transactions)

  return (
    <div
        className='transactions-list-main-container border h-[40%] overflow-auto p-5'
    >
        <div
            className='transactions-list-heading-container'
        >
            <button className='border'>Post transaction</button>
            <h1
                className='transactions-list-title text-royalBlue text-2xl mb-5 font-[600]'
            >
                Transactions
            </h1>

        </div>
        <table className='transaction-table w-full table-auto'>
            <thead>
                <tr>
                    <th className='w-[10%] text-left'>Date</th>
                    <th className='w-[30%] text-left'>Name</th>
                    <th className='w-[10%] text-left'>Category</th>
                    <th className='w-[10%] text-left'>Amount</th>
                    <th className='w-[40%] text-left'>Notes</th>
                </tr>
            </thead>
            <tbody className=''>
            {
                transactions &&
                transactions.map((trans, idx) => (
                    <tr key={idx}>
                        <td>
                            {trans.date?.slice(0,10)}
                        </td>
                        <td>
                            {trans.name}
                        </td>
                        <td>
                            {trans.category}
                        </td>
                        <td className='text-green'>
                            +${trans.amount}
                        </td>
                        <td>
                            {trans.notes}
                        </td>
                        {/* <TransactionOptions transactionId={trans._id} /> */}
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
  );
}
