import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ITransactionData } from "../../interfaces/ITransactionData";
import TransactionForm from "./TransactionForm";
import TransactionsList from "./TransactionsList";
import axios from 'axios'

interface ITransactionsProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    chartDataQuery: UseQueryResult<void, unknown>
}

export default function Transactions (props: ITransactionsProps) {
    const [showForm, setShowForm] = useState<boolean>(false)
    const [transactions, setTransactions] = useState<ITransactionData[]>([])
    const [user] = useState({
        id: localStorage.getItem('id')
    })

    async function getTransactions() {
        const response = await axios.get(`/api/users/${user.id}/transactions`)
        return response.data
        // return axios.get(`/api/users/${user.id}/transactions`).then(res => res.data)
    }

    const transactionsQuery = useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactions
    })

  return (
    <div
        className="transactions-main-container border h-[40%] p-5 overflow-auto"
    >
        <button
            className="transactions-toggle-button border bg-royalBlue text-offWhite p-2 rounded-md"
            onClick={() => setShowForm(!showForm)}
        >
            {!showForm ? 'Post a Transaction' : 'See Transactions'}
        </button>
        {
            !showForm ?
                <TransactionsList transactions={transactionsQuery.data} setIsLoggedIn={props.setIsLoggedIn} chartDataQuery={props.chartDataQuery}/>
                :
                <TransactionForm chartDataQuery={props.chartDataQuery} setIsLoggedIn={props.setIsLoggedIn} />
        }
    </div>
  );
}
