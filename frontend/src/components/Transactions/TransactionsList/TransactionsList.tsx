import { useMemo, useState } from 'react';
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

enum SortOption {
    DATEASC = 'date-asc',
    DATEDESC = 'date-desc',
    NAMEASC = 'name-asc',
    NAMEDESC = 'name-desc',
    AMOUNTHIGH = 'amount-high',
    AMOUNTLOW = 'amount-low'
}


export default function TransactionsList ({ chartDataQuery, transactions, setShowForm }: ITransactionsListProps) {
    // chartDataQuery.data contains transaction data for selected month

    const [ searchTerm, setSearchTerm ] = useState<string>('')
    const [ sortOption, setSortOption ] = useState<SortOption>(SortOption.DATEDESC)

    // recomputes appropriate order of transactions everytime new transaction gets add/edited or sort option changes
    const sortedTransactions = useMemo(() => {
        switch (sortOption) {
            case SortOption.DATEASC:
                return transactions?.slice().sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
            case SortOption.DATEDESC:
                return transactions?.slice().sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            case SortOption.NAMEASC:
                return transactions?.slice().sort((a, b) => a.name.localeCompare(b.name))
            case SortOption.NAMEDESC:
                return transactions?.slice().sort((a, b) => b.name.localeCompare(a.name))
            case SortOption.AMOUNTHIGH:
                return transactions?.slice().sort((a, b) => b.amount - a.amount)
            case SortOption.AMOUNTLOW:
                return transactions?.slice().sort((a, b) => a.amount - b.amount)
        }

    }, [transactions, sortOption])

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
                        className="transactions-toggle-button text-green text-3xl ml-1"
                        onClick={() => setShowForm(true)}
                    >
                        +
                    </button>

                </div>
                <div
                    className='transactions-list-top-left flex'
                >
                     <div>
                        <select
                            id='sort'
                            className='dark:bg-bgDarkMode focus:outline-none rounded-md dark:text-gray75 h-[2em] p-1 mr-3'
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            value={sortOption}
                        >
                            <option value={SortOption.DATEDESC}>Date descending</option>
                            <option value={SortOption.DATEASC}>Date ascending</option>
                            <option value={SortOption.NAMEASC}>Name (a - z)</option>
                            <option value={SortOption.NAMEDESC}>Name (z - a)</option>
                            <option value={SortOption.AMOUNTHIGH}>Amount highest</option>
                            <option value={SortOption.AMOUNTLOW}>Amount lowest</option>
                        </select>
                    </div>
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
                    sortedTransactions &&
                    sortedTransactions.filter(transaction => {
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
