import { useState, useEffect, FC } from 'react'
import axios from 'axios'
import ColumnChart from './ColumnChart'
import DonutChart from './DonutChart'
import ChartLegend from './ChartLegend'
import BarChart from './BarChart'

export interface IChartsProps {
}

export interface ICategoryTotals {
  Entertainment: number,
  Meals: number,
  Groceries: number,
  Electronics: number,
  Travel: number,
  Shopping: number,
  Other: number
}

type ICategoryTotalResponse = {
  _id: string,
  total: number
}

export default function Charts (props: IChartsProps) {
  const year: string = '2023'
  const month: string = '1'

  const [ user ] = useState({
    id: localStorage.getItem('id'),
    email: localStorage.getItem('email')
  })

  const [ data, setData ] = useState<ICategoryTotals>({
    'Entertainment': 0,
    'Meals': 0,
    'Groceries': 0,
    'Electronics': 0,
    'Travel': 0,
    'Shopping': 0,
    'Other': 0
  })

  useEffect(() => {
    axios.get(`/api/users/${user.id}/transactions/aggregate?year=${year}&month=${month}`)
        .then((response) => {
          const data: ICategoryTotals = {
            Entertainment: 0,
            Meals: 0,
            Groceries: 0,
            Electronics: 0,
            Travel: 0,
            Shopping: 0,
            Other: 0
          }
          response.data.forEach((ele: ICategoryTotalResponse) => {
            data[ele._id as keyof typeof data] = ele.total
          })
          setData(data)
          console.log('trans DATA', response.data)
        })
  },[])


  return (
    <div
      className='charts-main-container w-full flex flex-wrap content-start h-[60%]'
    >
      <DonutChart chartData={data} />
      <ColumnChart chartData={data}/>
      <BarChart chartData={data} />
      <ChartLegend />
    </div>
  );
}
