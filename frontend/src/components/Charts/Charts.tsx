import ColumnChart from './ColumnChart'
import DonutChart from './DonutChart'
import ChartLegend from './ChartLegend'
import BarChart from './BarChart'
import { ICategoryTotals } from '../../interfaces/ICategoryTotals'
import { ICategoryTotalsByMonth } from '../../interfaces/ICategoryTotalsByMonth'

interface IChartsProps {
  chartData: ICategoryTotals
  threeMonthChartData: ICategoryTotalsByMonth[]
}

export default function Charts ({chartData, threeMonthChartData}: IChartsProps) {

  return (
    <div
      className='charts-main-container w-full flex flex-wrap content-start h-[60%]'
    >
      <DonutChart chartData={chartData} />
      <ColumnChart chartData={chartData}/>
      <BarChart chartData={chartData} threeMonthChartData={threeMonthChartData} />
      <ChartLegend />
    </div>
  );
}
