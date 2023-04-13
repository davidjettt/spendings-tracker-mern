import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import TransactionForm from "./TransactionForm/TransactionForm";
import TransactionsList from "./TransactionsList/TransactionsList";
import axios from 'axios'
import { ICurrentUser } from "../../interfaces/ICurrentUser";

interface ITransactionsProps {
    chartDataQuery: UseQueryResult<void, unknown>
    threeMonthChartDataQuery: UseQueryResult<void, unknown>
}

export default function Transactions (props: ITransactionsProps) {
    const [showForm, setShowForm] = useState<boolean>(false)
    const storedUser: string | null = localStorage.getItem('currentUser')
    const user: ICurrentUser = JSON.parse(storedUser!)

    async function getTransactions() {
        const response = await axios.get(`/api/users/${user.id}/transactions`)
        return response.data
    }

    const transactionsQuery = useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactions
    })

  return (
    <div
        className="transactions-main-container bg-offWhite dark:bg-transctionsDarkMode w-[95%] h-[40%] pt-3 pl-5 pb-10 rounded-t-xl shadow-customLight dark:shadow-customDark"
    >
        {
            !showForm ?
                <TransactionsList setShowForm={setShowForm} transactions={transactionsQuery.data} chartDataQuery={props.chartDataQuery}/>
                :
                <TransactionForm setShowForm={setShowForm} chartDataQuery={props.chartDataQuery} threeMonthChartDataQuery={props.threeMonthChartDataQuery} />
        }
    </div>
  );
}
