import { Chart } from 'react-google-charts'
import { useState, useEffect, FC } from 'react'
import axios from 'axios'
import ColumnChart from './ColumnChart'

export interface IChartsProps {
}

interface ICategoryTotals {
  category: string,
  total: number
}

export default function Charts (props: IChartsProps) {
  const year: string = '2023'
  const month: string = '1'

  const [ user ] = useState({
    id: localStorage.getItem('id'),
    email: localStorage.getItem('email')
  })

  const [ data, setData ] = useState<ICategoryTotals | any>(null)
  const [ transactions, setTransactions ] = useState([])


  useEffect(() => {
    axios.get(`/api/users/${user.id}/transactions/aggregate?year=${year}&month=${month}`)
        .then((trans) => {
          const data: any = {}
          trans.data.forEach((ele: any) => {
            data[ele._id] = ele.total
          })
          setData(data)
          setTransactions(trans.data)
          console.log('trans DATA', trans.data)
        })
  },[])





  return (
    <>
      <ColumnChart chartData={{name: 'yes'}}/>

    </>
  );
}
