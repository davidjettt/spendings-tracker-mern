import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Charts from "../Charts/Charts";
import Transactions from "../Transactions/Transactions";
import NavBar from "../NavBar/NavBar";
import { ICategoryTotals } from "../../interfaces/ICategoryTotals";
import { useQuery } from "@tanstack/react-query";
import { ICategoryTotalAPIResponse } from "../../interfaces/ICategoryTotalAPIResponse";


interface IDashboardProps {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}



export default function Dashboard ({ setIsLoggedIn }: IDashboardProps) {
    const { currentUser } = useContext(CurrentUserContext)
    let navigate = useNavigate()
    const [ user ] = useState({
        id: localStorage.getItem('id'),
        email: localStorage.getItem('email')
    })
    console.log('user', currentUser)

    const year: string  = '2023'
    const month: string = '1'
    const [chartData, setChartData] = useState<ICategoryTotals>({
        'Entertainment': 0,
        'Meals': 0,
        'Groceries': 0,
        'Utilities': 0,
        'Travel': 0,
        'Shopping': 0,
        'Other': 0
    })

    const chartDataQuery = useQuery(
        ['chartData'],
        () => {
          axios.get(`/api/users/${user.id}/transactions/aggregate?year=${year}&month=${month}`)
          .then((response) => {
            const data: ICategoryTotals = {
              Entertainment: 0,
              Meals: 0,
              Groceries: 0,
              Utilities: 0,
              Travel: 0,
              Shopping: 0,
              Other: 0
            }
            response.data.forEach((ele: ICategoryTotalAPIResponse) => {
              data[ele._id as keyof typeof data] = ele.total
            })
            setChartData(data)
          })
        }
      )


  return (
    <div
        className="dashboard-main-container flex h-[100%] overflow-hidden"
    >
      <NavBar setIsLoggedIn={setIsLoggedIn} />
        {
            <div
                className="dashboard w-[95%]"
            >
                <h1>Month/Year dropdown goes here</h1>
                <Charts chartData={chartData} chartDataQuery={chartDataQuery} />
                <Transactions setIsLoggedIn={setIsLoggedIn} chartDataQuery={chartDataQuery} />
            </div>
        }
    </div>
  );
}
