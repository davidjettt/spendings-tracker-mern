import { useState } from 'react';
import { ITransactionData } from '../../../interfaces/ITransactionData';
import { UseQueryResult } from '@tanstack/react-query';
import 'date-fns'
import '../../../index.css'
import { useTheme } from '../../../context/ThemeContext';

interface ITransactionsListProps {
    // setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    chartDataQuery: UseQueryResult<void, unknown>
    transactions: ITransactionData[]
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}


export default function TransactionsList (props: ITransactionsListProps) {
    const [ searchTerm, setSearchTerm ] = useState<string>('')

  return (
    <>
        <div
            className='transactions-list-heading-container'
        >
            <div
                className='transactions-list-top flex justify-between'
            >
                <div
                    className='transactions-list-right flex h-fit gap-2'
                >
                    <h1
                        className='transactions-list-title text-royalBlue text-2xl font-bold'
                    >
                        Transactions
                    </h1>
                    <button
                        className="transactions-toggle-button border-royalBlue bg-royalBlue text-offWhite p-1 rounded-md"
                        onClick={() => props.setShowForm(true)}
                    >
                        Post transaction
                    </button>

                </div>
                <div
                    className='transactions-list-top-left'
                >
                    <div
                        className='search-bar-container w-[200px] flex flex-col'
                    >
                        <input
                            placeholder='Transaction name...'
                            id='search-bar'
                            className='search-bar w-full focus:outline-none border-none rounded-md h-[2em] pl-3 dark:bg-bgDarkMode dark:text-gray75'
                            type='search'
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

            </div>

        </div>
        <div
            className={`h-[100%] overflow-y-auto dark:scrollbar`}
        >
            <table className='transaction-table w-full h-[80%] border-collapse'>
                <thead
                    className={`sticky top-0 bg-offWhite dark:bg-transctionsDarkMode  pb-5`}
                >
                    <tr
                        className='text-[#bfbfbf]'
                    >
                        <th className='w-[10%] text-left px-4 py-2 font-bold'>Date</th>
                        <th className='w-[30%] text-left px-4 py-2 font-bold'>Name</th>
                        <th className='w-[10%] text-left px-4 py-2 font-bold'>Category</th>
                        <th className='w-[10%] text-left px-4 py-2 font-bold'>Amount</th>
                        <th className='w-[40%] text-left px-4 py-2 font-bold'>Notes</th>
                    </tr>
                </thead>
                <tbody className=''>
                {
                    props?.transactions &&
                    props.transactions.filter(transaction => {
                        if (searchTerm === '') return transaction
                        else if (transaction.name.toLowerCase().includes(searchTerm.toLowerCase())) return transaction
                    }).map((trans, idx) => (
                        <tr
                            className='bg-offWhite odd:bg-white dark:bg-transctionsDarkMode dark:odd:bg-bgDarkMode'
                            key={idx}
                        >
                            <td className='dark:text-gray75 px-4 py-2'>
                                {trans.date?.slice(0,10)}
                            </td>
                            <td className='dark:text-gray75 px-4 py-2'>
                                {trans.name}
                            </td>
                            <td className='dark:text-gray75 px-4 py-2'>
                                {trans.category === 'FoodDrink' ? 'Food & Drink' : trans.category}
                            </td>
                            <td className='text-green px-4 py-2'>
                                +${trans.amount}
                            </td>
                            <td className='dark:text-gray75 px-4 py-2'>
                                {trans.notes}
                            </td>
                        </tr>
                    ))
                }
                        <tr
                            className='bg-offWhite odd:bg-white dark:bg-transctionsDarkMode dark:odd:bg-bgDarkMode'

                        >
                            <td className='dark:text-gray75 px-4 py-2'>

                            </td>
                            <td className='dark:text-gray75 px-4 py-2'>

                            </td>
                            <td className='dark:text-gray75 px-4 py-2'>

                            </td>
                            <td className='text-green px-4 py-2'>

                            </td>
                            <td className='dark:text-gray75 px-4 py-2'>

                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
    </>
  );
}