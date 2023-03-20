import axios from 'axios';
import { useState, useEffect } from 'react'
import { ITransactionData } from '../../interfaces/ITransactionData';
import TransactionOptions from './TransactionOptions';
import 'date-fns'
import TransactionForm from './TransactionForm';
import { UseQueryResult } from '@tanstack/react-query';

interface ITransactionsListProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    chartDataQuery: UseQueryResult<void, unknown>
    transactions: ITransactionData[]
}


export default function TransactionsList (props: ITransactionsListProps) {
    // const [ transactions, setTransactions ] = useState<ITransactionData[]>([])
    const [showForm, setShowForm] = useState(false)
    // const [ user ] = useState({
    //     id: localStorage.getItem('id')
    // })


    // useEffect(() => {
    //     axios.get(`/api/users/${user.id}/transactions`)
    //         .then((trans) => {
    //             setTransactions(trans.data)
    //         })
    // }, [])

    const handleClick = () => {
        setShowForm(!showForm)
    }

  return (
    <div
        className='transactions-list-main-container border h-[40%] p-5 overflow-y-auto'
    >
        <button onClick={handleClick} className='border'>Post transaction</button>
        <div
            className='transactions-list-heading-container'
        >
            <h1
                className='transactions-list-title text-royalBlue text-2xl mb-5 font-[600]'
            >
                Transactions
            </h1>

        </div>
        {!showForm ? <table className='transaction-table w-full table-auto'>
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
                props.transactions &&
                props.transactions.map((trans, idx) => (
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
                    </tr>
                ))
            }
            </tbody>
        </table> :
        <div></div>
        // <TransactionForm chartDataQuery={props.chartDataQuery} setIsLoggedIn={props.setIsLoggedIn} transactions={transactions} setTransactions={setTransactions} />
        }
    </div>
  );
}
