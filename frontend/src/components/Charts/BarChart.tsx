import { UseQueryResult } from '@tanstack/react-query';
import { Chart } from 'react-google-charts'
import { ICategoryTotals } from '../../interfaces/ICategoryTotals';
import { ICategoryTotalsByMonth } from '../../interfaces/ICategoryTotalsByMonth';
import { ISingleCategoryTotal } from '../../interfaces/ISingleCategoryTotal';

interface IBarChartProps {
  chartData: ICategoryTotals
  // month1: ICategoryTotalsByMonth
  // month2: ICategoryTotalsByMonth
  // month3: ICategoryTotalsByMonth
  threeMonthChartData: ICategoryTotalsByMonth[]
}

export default function BarChart ({ threeMonthChartData }: IBarChartProps) {
  const chartData1 = threeMonthChartData[0]
  const chartData2 = threeMonthChartData[1]

  console.log('CHart before sort', chartData1)

  chartData1.categories.sort((a: any, b: any) => b.category - a.category)

  // TODO make an array with data needed to fill chart and add array to data variable

  console.log('CHARTDATA 1', chartData1)
  const data = [
      ["Month", "Entertainment", "Food & Drink", "Groceries", "Other", "Shopping", "Travel", "Utilities"],
      ['January',34,234,45,232,32,434, 23],
      ["Feburary", 110, 460, 250, 222,222,222,34],
      ["March", 660, 110, 300, 222,222,222,65],
    ];

  const options = {
    title: "Monthly Total",
    chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: "",
      minValue: 0,
      format: 'currency'
    },
    vAxis: {
      title: "Month",
    },
    series: {
      0: {color: '#990099'}, // Entertainment
      1: {color: '#DC3913'}, // Food & Drink
      2: {color: '#449F46'}, // Groceries
      3: {color: '#90A4AF'}, // Other
      4: {color: '#FF9802'}, // Shopping
      5: {color: '#3366CC'}, // Travel
      6: {color: '#0199C6'} // Utilities
    },
    legend: 'none'
    // 'height': 600
  };

  return (
    <div
      className='bar-chart-container w-[33%] h-[90%]'
    >
        <Chart
            chartType="BarChart"
            width="100%"
            height="100%"
            data={data}
            options={options}
        />

    </div>
  );
}
