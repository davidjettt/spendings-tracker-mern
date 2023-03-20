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

interface IDashboardProps {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Dashboard ({ setIsLoggedIn }: IDashboardProps) {
    const { currentUser } = useContext(CurrentUserContext)
    const [ user ] = useState({
        id: localStorage.getItem('id'),
        email: localStorage.getItem('email')
    })
    console.log('DASHBOARD CURRENT USER', currentUser)
    console.log('USER LOCAL STORAGE', user)

    const year: string  = '2023'
    const [filterMonth, setFilterMonth] = useState<string>('1')
    const [filterYear, setFilterYear] = useState<string>('2023')
    const [chartData, setChartData] = useState<ICategoryTotals>({
        'Entertainment': 0,
        'FoodDrink': 0,
        'Groceries': 0,
        'Utilities': 0,
        'Travel': 0,
        'Shopping': 0,
        'Other': 0
    })

    async function fetchChartData() {
      const response = await axios.get(`/api/users/${user.id}/transactions/aggregate?year=${filterYear}&month=${filterMonth}`)
      console.log('I FETCHED AGAIN')
      console.log('FETCH RESPONSE', response.data)
      // const data: ICategoryTotals = {
      //   Entertainment: 0,
      //   Meals: 0,
      //   Groceries: 0,
      //   Utilities: 0,
      //   Travel: 0,
      //   Shopping: 0,
      //   Other: 0
      // }
      // response.data.forEach((ele: ICategoryTotalAPIResponse) => {
      //   data[ele._id as keyof typeof data] = ele.total
      // })
      setChartData(response.data)
      return response.data
    }
    const chartDataQuery = useQuery({
      queryKey: ['chartData'],
      queryFn: fetchChartData
    })

    useEffect(() => {
      fetchChartData()
    },[filterMonth, filterYear])


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
                <Charts chartData={chartData} />
                <Transactions setIsLoggedIn={setIsLoggedIn} chartDataQuery={chartDataQuery} />
            </div>
        }
    </div>
  );
}
