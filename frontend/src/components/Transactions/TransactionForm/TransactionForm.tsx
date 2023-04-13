import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { ITransactionData } from '../../../interfaces/ITransactionData'
import "react-datepicker/dist/react-datepicker.css"
import { useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { ICurrentUser } from "../../../interfaces/ICurrentUser";

interface ITransactionFormProps {
  chartDataQuery: UseQueryResult<void, unknown>
  threeMonthChartDataQuery: UseQueryResult<void, unknown>
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TransactionForm ({chartDataQuery, setShowForm, threeMonthChartDataQuery}: ITransactionFormProps) {
  const storedUser: string | null = localStorage.getItem('currentUser')
  const user: ICurrentUser = JSON.parse(storedUser!)

  const defaultData = {
    name: '',
    category: 'Entertainment',
    date: '',
    amount: 0,
    notes: '',
    userId: user.id
  }

  function addTransaction(data: ITransactionData) {
    return axios.post(`/api/users/${user?.id}/transactions`, data)
  }

  const [ transactionData, setTransactionData ] = useState<ITransactionData>(defaultData)
  const queryClient = useQueryClient()
  const newTransactionMutation = useMutation({
    mutationFn: addTransaction,
      // onSuccess: newTransaction => {
      //   queryClient.setQueryData(['transactions', newTransaction.data._id], newTransaction.data)
      // }
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions'])
    }
  })

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()
    newTransactionMutation?.mutate(transactionData)
    chartDataQuery?.refetch()
    threeMonthChartDataQuery?.refetch()
    setTransactionData(defaultData)
  }

  return (
    <div
      className='transaction-form-main-container flex flex-col h-full'
    >
      <div
        className='form-heading-container flex h-fit gap-2'
      >
        <h1
          className='form-title text-royalBlue text-2xl font-[600]'
        >
          Post a transaction
        </h1>
        <button
            className="transactions-toggle-button border-royalBlue bg-royalBlue text-offWhite p-1.5 rounded-md"
            onClick={() => setShowForm(false)}
        >
            See transactions
        </button>
      </div>
        <div
          className='transaction-form-container w-[95%] h-full flex items-center'
        >
          <form
            className='trans-form w-[100%] flex flex-col items-center justify-center h-[90%]'
            onSubmit={handleSubmit}
          >
            <div
              className='form-container w-[50em] h-[15em] grid grid-cols-2'
            >
                <div
                  className='trans-name-container col-span-4'
                >
                  <label
                    className='transaction-name-label flex flex-col dark:text-gray75 '
                    htmlFor='transaction-name'
                  >
                    Name
                  </label>
                  <input
                    className='transaction-name-input w-[80%] shadow appearance-none border dark:border-none focus:outline-none pl-2 py-2 font-sans rounded-md dark:bg-bgDarkMode dark:text-gray75'
                    id='transaction-name'
                    type='text'
                    name='name'
                    value={transactionData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div
                  className='trans-category-container flex flex-col w-fit'
                >
                  <label className='dark:text-gray75'>
                    Category
                  </label>
                  <select
                    className='border p-2.5 rounded-md font-sans dark:border-none dark:bg-bgDarkMode dark:text-gray75'
                    name='category'
                    value={transactionData.category}
                    onChange={handleInputChange}
                  >
                    <option value='Entertainment'>Entertainment</option>
                    <option value='FoodDrink'>Food & Drink</option>
                    <option value='Groceries'>Groceries</option>
                    <option value='Other'>Other</option>
                    <option value='Shopping'>Shopping</option>
                    <option value='Travel'>Travel</option>
                    <option value='Utilities'>Utilities</option>
                  </select>
                </div>
                <div
                  className='trans-date-container'
                >
                  <label
                    className='transaction-date-label flex flex-col dark:text-gray75 '
                    htmlFor='transaction-date'
                  >
                    Date
                  </label>
                  <input
                    className='transaction-date-input border dark:border-none focus:outline-none p-2 rounded-md font-sans dark:bg-bgDarkMode dark:text-gray75'
                    type='date'
                    id='transaction-date'
                    name='date'
                    value={transactionData.date}
                    onChange={handleInputChange}
                    required
                  />

                </div>
                <div
                  className='trans-amount-container'
                >
                  <label
                    className='transaction-amount-label flex flex-col dark:text-gray75'
                    htmlFor='transaction-amount'
                  >
                    Amount
                  </label>
                  <input
                    className='transaction-amount-input shadow appearance-none border dark:border-none focus:outline-none pl-2 py-2 rounded-md font-sans dark:bg-bgDarkMode dark:text-gray75'
                    type='number'
                    id='transaction-amount'
                    name='amount'
                    placeholder='amount'
                    value={transactionData.amount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div
                  className='trans-notes-container col-span-2'
                >
                  <label
                    className='transaction-notes-label flex flex-col dark:text-gray75'
                    htmlFor='transaction-notes'
                  >
                    Notes
                  </label>
                  <textarea
                    className='transaction-notes-input overflow-y-auto rounded-md dark:border-none p-2 resize-none dark:bg-bgDarkMode dark:text-gray75 focus:outline-none'
                    cols={55}
                    id='transaction-notes'
                    name='notes'
                    value={transactionData.notes}
                    onChange={handleInputChange}
                  />
                </div>
            <button
              className={`transaction-form-button w-fit h-fit col-span-2 justify-self-center self-center bg-royalBlue text-offWhite p-3 rounded-xl ${newTransactionMutation.isLoading ? 'opacity-60' : 'opacity-100'}`}
              disabled={newTransactionMutation.isLoading}
            >
              {newTransactionMutation.isLoading ? 'Processing...' : 'Post Transaction'}
            </button>
            </div>
          </form>
        </div>
    </div>
  );
}
