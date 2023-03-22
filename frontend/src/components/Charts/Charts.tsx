import ColumnChart from './ColumnChart'
import DonutChart from './DonutChart'
import ChartLegend from './ChartLegend'
import BarChart from './BarChart'
import { ICategoryTotals } from '../../interfaces/ICategoryTotals'

interface IChartsProps {
  chartData: ICategoryTotals
  threeMonthChartData: (string | number)[]
}

export default function Charts ({chartData, threeMonthChartData}: IChartsProps) {

  return (
    <div
      className='charts-main-container w-full flex flex-wrap content-start h-[60%] dark:bg-bgDarkMode'
    >
      <DonutChart chartData={chartData} />
      <ColumnChart chartData={chartData}/>
      <BarChart threeMonthChartData={threeMonthChartData} />
      <ChartLegend />
    </div>
  );
}
