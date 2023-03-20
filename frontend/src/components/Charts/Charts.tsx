import { useState, useEffect, FC } from 'react'
import axios from 'axios'
import ColumnChart from './ColumnChart'
import DonutChart from './DonutChart'
import ChartLegend from './ChartLegend'
import BarChart from './BarChart'
import { ICategoryTotals } from '../../interfaces/ICategoryTotals'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export interface IChartsProps {
  chartData: ICategoryTotals
  chartDataQuery: UseQueryResult<void, unknown>
}



type ICategoryTotalResponse = {
  _id: string,
  total: number
}

export default function Charts ({chartData}: IChartsProps) {
  const year: string = '2023'
  const month: string = '1'

  const [ user ] = useState({
    id: localStorage.getItem('id'),
    email: localStorage.getItem('email')
  })

  // const [ data, setData ] = useState<ICategoryTotals>({
  //   'Entertainment': 0,
  //   'Meals': 0,
  //   'Groceries': 0,
  //   'Utilities': 0,
  //   'Travel': 0,
  //   'Shopping': 0,
  //   'Other': 0
  // })

  // useEffect(() => {
  //   axios.get(`/api/users/${user.id}/transactions/aggregate?year=${year}&month=${month}`)
  //       .then((response) => {
  //         const data: ICategoryTotals = {
  //           Entertainment: 0,
  //           Meals: 0,
  //           Groceries: 0,
  //           Utilities: 0,
  //           Travel: 0,
  //           Shopping: 0,
  //           Other: 0
  //         }
  //         response.data.forEach((ele: ICategoryTotalResponse) => {
  //           data[ele._id as keyof typeof data] = ele.total
  //         })
  //         setData(data)
  //       })
  // },[])


  return (
    <div
      className='charts-main-container w-full flex flex-wrap content-start h-[60%]'
    >
      <DonutChart chartData={chartData} />
      <ColumnChart chartData={chartData}/>
      <BarChart chartData={chartData} />
      <ChartLegend />
    </div>
  );
}
