import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Charts from "../Charts/Charts";
import Transactions from "../Transactions/Transactions";
import NavBar from "../NavBar/NavBar";
import { ICategoryTotals } from "../../interfaces/ICategoryTotals";
import { useQuery } from "@tanstack/react-query";
import { ICategoryTotalAPIResponse } from "../../interfaces/ICategoryTotalAPIResponse";
import ChartFilter from "../ChartFilter/ChartFilter";
import { ICategoryTotalWithTransactions } from "../../interfaces/ICategoryTotalWithTransactions";
import { ICategoryTotalsByMonth } from "../../interfaces/ICategoryTotalsByMonth";

interface IDashboardProps {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Dashboard ({ setIsLoggedIn }: IDashboardProps) {
  // TODO have a button in transactions section that will only display transactions for a specific month based on the charts (do i need another fetch call for this?)
      // I don't think I need another fetch call. Can just fetch category totals with transactions and flatten transactions array into a list of transactions for that month and pass to transactions component
  // TODO make another fetch call in dashboard that gets 3 month transaction data and send data to bar chart component to use
  // TODO Create light/dark mode

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
    // console.log('DASHBOARD CURRENT USER', currentUser)
    // console.log('USER LOCAL STORAGE', user)

    const [filterMonth, setFilterMonth] = useState<string>('1')
    const [filterYear, setFilterYear] = useState<string>('2023')
    const [chartData, setChartData] = useState<ICategoryTotals>(defaultData)
    // const [month1, setMonth1] = useState<ICategoryTotalsByMonth | null>(null)
    // const [month2, setMonth2] = useState<ICategoryTotalsByMonth | null>(null)
    // const [month3, setMonth3] = useState<ICategoryTotalsByMonth | null>(null)
    const [threeMonthChartData, setThreeMonthChartData] = useState<ICategoryTotalsByMonth[] | []>([])


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
    const chartDataQuery = useQuery({
      queryKey: ['chartData'],
      queryFn: fetchChartData
    })

    useEffect(() => {
      fetchChartData()
    },[filterMonth, filterYear])

    async function fetchThreeMonthChartData() {
      const response = await axios.get(`/api/users/${user.id}/transactions/categories/total/threeMonths?year=${filterYear}&month=${filterMonth}`)
      const data = response.data
      console.log('THREE MONTH DATA', data)
      if (data.length === 0) {
        // TODO handle situation where no data gets returned (show message, etc.)
      }

      // setMonth1(data[0])
      // setMonth2(data[1])
      // setMonth3(data[2])
      setThreeMonthChartData(data)
    }

    const threeMonthChartDataQuery = useQuery({
      queryKey: ['threeMonthChartData'],
      queryFn: fetchThreeMonthChartData
    })


    // const chartDataQuery = useQuery(
    //     ['chartData'],
    //     () => {
    //       return axios.get(`/api/users/${user.id}/transactions/aggregate?year=${filterYear}&month=${filterMonth}`)
    //       .then((response) => {
    //         console.log('I AM FETCHING AGAIN')
    //         const data: ICategoryTotals = {
    //           Entertainment: 0,
    //           Meals: 0,
    //           Groceries: 0,
    //           Utilities: 0,
    //           Travel: 0,
    //           Shopping: 0,
    //           Other: 0
    //         }
    //         response.data.forEach((ele: ICategoryTotalAPIResponse) => {
    //           data[ele._id as keyof typeof data] = ele.total
    //         })
    //         setChartData(data)
    //         return response.data
    //       })
    //     }
    //   )

    // if (chartDataQuery.isLoading) console.log('loading')


  return (
    <div
        className="dashboard-main-container flex h-[100%] overflow-hidden"
    >
      <NavBar setIsLoggedIn={setIsLoggedIn} />
        {
            <div
                className="dashboard w-[95%]"
            >
                <ChartFilter setFilterMonth={setFilterMonth} setFilterYear={setFilterYear} />
                <Charts chartData={chartData} threeMonthChartData={threeMonthChartData} />
                <Transactions setIsLoggedIn={setIsLoggedIn} chartDataQuery={chartDataQuery} />
            </div>
        }
    </div>
  );
}
