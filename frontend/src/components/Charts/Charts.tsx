import { Chart } from 'react-google-charts'
import { useState, useEffect } from 'react'
import axios from 'axios'

export interface IChartsProps {
}

export default function Charts (props: IChartsProps) {
  const [ user ] = useState({
    id: localStorage.getItem('id'),
    email: localStorage.getItem('email')
  })

  const [ transactions, setTransactions ] = useState([])
  const [ mealsTotal, setMealsTotal ] = useState(0)
  const [ travelTotal, setTravelTotal ] = useState(0)
  const [ electronicsTotal, setElectronicsTotal ] = useState(0)
  const [ groceriesTotal, setGroceriesTotal ] = useState(0)

  useEffect(() => {
    axios.get(`/api/users/${user.id}/transactions`)
        .then((trans) => {
          setTransactions(trans.data)
          console.log('trans', trans.data)
        })
  },[])



  const data = [
    ["Month", "Travel", "Meals", "Electronics", "Groceries", "Utilites", "Entertainment"],
    ["January", 1000, 400, 200, 222,222,222],
    ["Feburary", 1170, 460, 250, 222,222,222],
    ["March", 660, 1120, 300, 222,222,222],
    ["April", 1030, 540, 350, 222,222,222],
    ["May", 0,0,0,0,0,0]
  ];

  const options = {
    title: "Monthly Spending",
    chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: "Category",
      minValue: 0,
    },
    vAxis: {
      title: "Month",
    },
  };

  return (
    <>

    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
    </>
  );
}
