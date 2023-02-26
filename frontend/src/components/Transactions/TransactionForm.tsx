import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { ITransactionData } from '../../interfaces/ITransactionData'

export interface ITransactionFormProps {
}

export default function TransactionForm (props: ITransactionFormProps) {
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
  const [ transactionData, setTransactionData ] = useState<ITransactionData>(defaultData)


  const handleInputChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()

    console.log('data', transactionData)
    axios.post(`/api/users/${user.id}/transactions`, transactionData)
        .then((transaction) => {
          console.log('success')
        })
        .catch((err) => {
          console.log('transaction error', err)
        })
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
          <h1>Transaction Form</h1>
          <input
            type='text'
            name='name'
            placeholder='name'
            value={transactionData.name}
            onChange={handleInputChange}
          />
          <select name='category' value={transactionData.category} onChange={handleInputChange}>
            <option value='Electronics'>Electronics</option>
            <option value='Entertainment'>Entertainment</option>
            <option value='Travel'>Travel</option>
            <option value='Meals'>Meals</option>
            <option value='Groceries'>Groceries</option>
          </select>
          <input
            type='text'
            name='date'
            placeholder='date'
            value={transactionData.date}
            onChange={handleInputChange}
          />
          <input
            type='number'
            name='amount'
            placeholder='amount'
            value={transactionData.amount}
            onChange={handleInputChange}
          />
          <textarea
            name='notes'
            placeholder='notes'
            value={transactionData.notes}
            onChange={handleInputChange}
          />
          <button>Submit</button>
        </form>
    </>
  );
}
