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

    const transactionsQuery = useQuery(
        ['transactions'],
        () => {
            axios.get(`/api/users/${user.id}/transactions`)
                .then((response) => {
                    setTransactions(response.data)
                })
        }
    )


  return (
    <div
        className="transactions-main-container border h-[40%] p-5 overflow-auto"
    >
        <button
            className="transactions-toggle-button"
            onClick={() => setShowForm(!showForm)}
        >
            {!showForm ? 'Transactions' : 'Post Transaction'}
        </button>
        {
            !showForm ?
                <TransactionsList transactions={transactions} setIsLoggedIn={props.setIsLoggedIn} chartDataQuery={props.chartDataQuery}/>
                :
                <TransactionForm transactions={transactions} setTransactions={setTransactions} chartDataQuery={props.chartDataQuery} setIsLoggedIn={props.setIsLoggedIn} />
        }
    </div>
  );
}
