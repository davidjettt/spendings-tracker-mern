import { ITransactionData } from '../../interfaces/ITransactionData';
import { UseQueryResult } from '@tanstack/react-query';
import 'date-fns'

interface ITransactionsListProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    chartDataQuery: UseQueryResult<void, unknown>
    transactions: ITransactionData[]
}


export default function TransactionsList (props: ITransactionsListProps) {

  return (
    <>
        <div
            className='transactions-list-heading-container'
        >
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
                props?.transactions &&
                props.transactions?.map((trans, idx) => (
                    <tr key={idx}>
                        <td className='dark:text-offWhite'>
                            {trans.date?.slice(0,10)}
                        </td>
                        <td className='dark:text-offWhite'>
                            {trans.name}
                        </td>
                        <td className='dark:text-offWhite'>
                            {trans.category === 'FoodDrink' ? 'Food & Drink' : trans.category}
                        </td>
                        <td className='text-green'>
                            +${trans.amount}
                        </td>
                        <td className='dark:text-offWhite'>
                            {trans.notes}
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </>
  );
}
