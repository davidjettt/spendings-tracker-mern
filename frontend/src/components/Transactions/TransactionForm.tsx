import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { ITransactionData } from '../../interfaces/ITransactionData'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query'

interface ITransactionFormProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  chartDataQuery: UseQueryResult<void, unknown>
  threeMonthChartDataQuery: UseQueryResult<void, unknown>
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TransactionForm ({chartDataQuery, setShowForm, threeMonthChartDataQuery, setIsLoggedIn}: ITransactionFormProps) {
  const [ user ] = useState({
    id: localStorage.getItem('id'),
    email: localStorage.getItem('email')
})

  const defaultData = {
    name: '',
    category: '',
    date: '',
    amount: 0,
    notes: '',
    userId: user.id
  }

  function addTransaction(data: ITransactionData) {
    return axios.post(`/api/users/${user.id}/transactions`, data)
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

    console.log('data before submitting', transactionData)

    newTransactionMutation.mutate(transactionData)
    chartDataQuery?.refetch()
    threeMonthChartDataQuery?.refetch()
    setTransactionData(defaultData)
  }

  if (newTransactionMutation.isLoading) return <h1>.......LOADING..........</h1>

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
            className="transactions-toggle-button border-royalBlue bg-royalBlue text-offWhite p-1 rounded-md"
            onClick={() => setShowForm(false)}
        >
            See transactions
        </button>
      </div>
        <div
          className='transaction-form-container w-[95%] h-full'
        >
          <form
            className='trans-form w-[100%] flex flex-col items-center justify-center h-full'
            onSubmit={handleSubmit}
          >
            <div
              className='form-container w-[50%] h-full grid grid-cols-3'
            >
                <div
                  className='trans-name-container'
                >
                  <label
                    className='transaction-name-label flex flex-col dark:text-gray75'
                    htmlFor='transaction-name'
                  >
                    Name
                  </label>
                  <input
                    className='transaction-name-input w-[80%] shadow appearance-none border dark:border-none focus:outline-none pl-2 py-2 font-sans rounded-md dark:bg-bgDarkMode dark:text-gray75'
                    id='transaction-name'
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={transactionData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div
                  className='trans-category-container flex flex-col w-fit'
                >
                  <label className='dark:text-gray75'>
                    Category
                  </label>
                  <select
                    className='border p-2 rounded-md font-sans dark:border-none dark:bg-bgDarkMode dark:text-gray75'
                    name='category'
                    value={transactionData.category}
                    onChange={handleInputChange}
                  >
                    <option value='' defaultValue=''>Category</option>
                    <option value='Utilities'>Utilities</option>
                    <option value='Entertainment'>Entertainment</option>
                    <option value='Travel'>Travel</option>
                    <option value='FoodDrink'>Food & Drink</option>
                    <option value='Groceries'>Groceries</option>
                    <option value='Shopping'>Shopping</option>
                    <option value='Other'>Other</option>
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
                    className='transaction-amount-input shadow appearance-none border dark:border-none focus:outline-none pl-2 py-1 rounded-md font-sans dark:bg-bgDarkMode dark:text-gray75'
                    type='number'
                    id='transaction-amount'
                    name='amount'
                    placeholder='amount'
                    value={transactionData.amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div
                  className='trans-notes-container'
                >
                  <label
                    className='transaction-notes-label flex flex-col dark:text-gray75'
                    htmlFor='transaction-notes'
                  >
                    Notes
                  </label>
                  <textarea
                    className='transaction-notes-input rounded-md dark:border-none p-2 resize-x dark:bg-bgDarkMode dark:text-gray75 focus:outline-none'
                    cols={55}
                    id='transaction-notes'
                    name='notes'
                    placeholder='notes'
                    value={transactionData.notes}
                    onChange={handleInputChange}
                  />
                </div>
            </div>
            <button
              className={`transaction-form-button bg-royalBlue text-offWhite p-2 rounded-md disabled:${newTransactionMutation.isLoading ? 'opacity-70' : 'opacity-100'}`}
              disabled={newTransactionMutation.isLoading}
            >
              Submit
            </button>
          </form>

        </div>
    </div>
  );
}
