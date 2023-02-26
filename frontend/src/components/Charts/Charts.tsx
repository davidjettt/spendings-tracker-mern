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

  useEffect(() => {
    axios.get(`/api/users/${user.id}/transactions`)
        .then((trans) => {
          setTransactions(trans.data)
          console.log('trans', trans.data)
        })
  },[])


  const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];

  const options = {
    chart: {
      title: "Monthly Spending",
    },
  };

  return (
    <>

    {/* <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    /> */}
    </>
  );
}
