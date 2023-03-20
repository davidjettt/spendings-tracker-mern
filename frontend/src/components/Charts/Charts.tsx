import ColumnChart from './ColumnChart'
import DonutChart from './DonutChart'
import ChartLegend from './ChartLegend'
import BarChart from './BarChart'
import { ICategoryTotals } from '../../interfaces/ICategoryTotals'

interface IChartsProps {
  chartData: ICategoryTotals
}

export default function Charts ({chartData}: IChartsProps) {

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
