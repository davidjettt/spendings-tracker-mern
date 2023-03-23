import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ICategoryTotals } from "../../interfaces/ICategoryTotals";
import { useQuery } from "@tanstack/react-query";
import { ICategoryTotalWithTransactions } from "../../interfaces/ICategoryTotalWithTransactions";
import axios from "axios";
import Charts from "../Charts/Charts";
import Transactions from "../Transactions/Transactions";
import NavBar from "../NavBar/NavBar";
import ChartFilter from "../ChartFilter/ChartFilter";

interface IDashboardProps {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Dashboard ({ setIsLoggedIn }: IDashboardProps) {
  // TODO have a button in transactions section that will only display transactions for a specific month based on the charts (do i need another fetch call for this?)
      // I don't think I need another fetch call. Can just fetch category totals with transactions and flatten transactions array into a list of transactions for that month and pass to transactions component
    const { currentUser } = useContext(CurrentUserContext)
    const defaultData: ICategoryTotals = {
      'Entertainment': 0,
      'FoodDrink': 0,
      'Groceries': 0,
      'Utilities': 0,
      'Travel': 0,
      'Shopping': 0,
      'Other': 0
  }
    const [ user ] = useState({
        id: localStorage.getItem('id'),
        email: localStorage.getItem('email')
    })
    const [filterMonth, setFilterMonth] = useState<string>('1')
    const [filterYear, setFilterYear] = useState<string>('2023')
    const [chartData, setChartData] = useState<ICategoryTotals>(defaultData)
    const [threeMonthChartData, setThreeMonthChartData] = useState<(string | number)[]>([])

    async function fetchChartData() {
      const response = await axios.get(`/api/users/${user.id}/transactions/categories/total?year=${filterYear}&month=${filterMonth}`)
      const data = response.data
      // console.log('FETCH RESPONSE', response.data)
      if (data.length === 0) {
        setChartData(defaultData)
        return
      }
      const categoryTotals: ICategoryTotals = {
        Entertainment: 0,
        FoodDrink: 0,
        Groceries: 0,
        Utilities: 0,
        Travel: 0,
        Shopping: 0,
        Other: 0
      }
      data.forEach((ele: ICategoryTotalWithTransactions) => {
        categoryTotals[ele.category as keyof typeof categoryTotals] = ele.total
      })
      setChartData(categoryTotals)
      return data
    }
    async function fetchThreeMonthChartData() {
      const response = await axios.get(`/api/users/${user.id}/transactions/categories/total/threeMonths?year=${filterYear}&month=${filterMonth}`)
      const data = response.data
      if (data.length === 0) {
        // TODO handle situation where no data gets returned (show message, etc.)
      }

      setThreeMonthChartData(data)
    }
    const chartDataQuery = useQuery({
      queryKey: ['chartData'],
      queryFn: fetchChartData
    })
    const threeMonthChartDataQuery = useQuery({
      queryKey: ['threeMonthChartData'],
      queryFn: fetchThreeMonthChartData
    })

    useEffect(() => {
      chartDataQuery.refetch()
      threeMonthChartDataQuery.refetch()
    },[filterMonth, filterYear])


    // if (chartDataQuery.isLoading) console.log('loading')

  return (
    <div
        className="dashboard-main-container bg-white flex h-[100%] overflow-hidden dark:bg-bgDarkMode"
    >
      <NavBar setIsLoggedIn={setIsLoggedIn} />
        {
            <div
                className="dashboard w-[95%] relative flex flex-col items-center"
            >
                <ChartFilter setFilterMonth={setFilterMonth} setFilterYear={setFilterYear} />
                <Charts chartData={chartData} threeMonthChartData={threeMonthChartData} />
                <Transactions setIsLoggedIn={setIsLoggedIn} chartDataQuery={chartDataQuery} threeMonthChartDataQuery={threeMonthChartDataQuery} />
                <div className="height[50px]"></div>
            </div>
        }
    </div>
  );
}
