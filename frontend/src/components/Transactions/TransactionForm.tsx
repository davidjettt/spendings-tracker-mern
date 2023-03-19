import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { ITransactionData } from '../../interfaces/ITransactionData'
import NavBar from '../NavBar/NavBar'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export interface ITransactionFormProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TransactionForm ({setIsLoggedIn}: ITransactionFormProps) {
  const [ user ] = useState({
    id: localStorage.getItem('id'),
    email: localStorage.getItem('email')
})

  const defaultData = {
    _id: '',
    name: '',
    category: '',
    date: '',
    amount: 0,
    notes: '',
    userId: user.id
  }
  const [ transactionData, setTransactionData ] = useState<ITransactionData>(defaultData)
  const [startDate, setStartDate] = useState(new Date())

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()

    console.log('data before submitting', transactionData)
    axios.post(`/api/users/${user.id}/transactions`, transactionData)
        .then((transaction) => {
          console.log('success')
        })
        .catch((err) => {
          console.log('transaction error', err)
        })
  }

  return (
    <div
      className='transaction-form-main-container flex'
    >
        <NavBar setIsLoggedIn={setIsLoggedIn} />
        <div
          className='transaction-form-container w-[95%] flex justify-center'
        >
          <h1 className='text-royalBlue'>Post a transaction</h1>
          <form onSubmit={handleSubmit}>
            <label
              className='transaction-name-label flex flex-col'
            >
              Name
              <input
                className='transaction-name-input border'
                type='text'
                name='name'
                placeholder='Transaction Name'
                value={transactionData.name}
                onChange={handleInputChange}
              />
            </label>
            <select
              className='border'
              name='category'
              value={transactionData.category}
              onChange={handleInputChange}
            >
              <option value='' defaultValue=''>Category</option>
              <option value='Utilities'>Utilities</option>
              <option value='Entertainment'>Entertainment</option>
              <option value='Travel'>Travel</option>
              <option value='Meals'>Meals</option>
              <option value='Groceries'>Groceries</option>
              <option value='Shopping'>Shopping</option>
              <option value='Other'>Other</option>
            </select>
            <label
              className='transaction-date-label flex flex-col'
            >
              Date
              <input
                className='transaction-date-input border p-1'
                type='date'
                name='date'
                value={transactionData.date}
                onChange={handleInputChange}
              />
            </label>
            {/* <Calendar handleInputChange={handleInputChange} setTransactionData={setTransactionData} transactionData={transactionData} /> */}
            {/* <DatePicker name='date' className='border' selected={new Date() || transactionData.date} onChange={handleInputChange} /> */}
            <label
              className='transaction-amount-label flex flex-col'
            >
              Amount
              <input
                className='transaction-amount-input border'
                type='number'
                name='amount'
                placeholder='amount'
                value={transactionData.amount}
                onChange={handleInputChange}
              />
            </label>
            <label
              className='transaction-notes-label flex flex-col'
            >
              Notes
              <textarea
                className='transaction-notes-input border'
                name='notes'
                placeholder='notes'
                value={transactionData.notes}
                onChange={handleInputChange}
              />
            </label>
            <button
              className='transaction-form-button bg-royalBlue text-offWhite p-2 rounded-md'
            >
              Submit
            </button>
          </form>

        </div>
    </div>
  );
}
