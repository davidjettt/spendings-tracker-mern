import { Chart } from 'react-google-charts'
import { ICategoryTotals } from './Charts';

interface IBarChartProps {
  chartData: ICategoryTotals
}

export default function BarChart ({ chartData }: IBarChartProps) {

    const data = [
        ["Month", "Travel", "Meals", "Electronics", "Groceries", "Shopping", "Entertainment"],
        ["January", 1000, 400, 200, 222,222,0],
        ["Feburary", 1170, 460, 250, 222,222,222],
        ["March", 660, 1120, 300, 222,222,222],
      ];

      const options = {
        title: "Monthly Total",
        chartArea: { width: "50%" },
        isStacked: true,
        hAxis: {
          title: "Category",
          minValue: 0,
        },
        vAxis: {
          title: "Month",
        },
        series: {
          0: {color: '#3366CC'},
          1: {color: '#DC3913'},
          2: {color: '#0199C6'},
          3: {color: '#449F46'},
          4: {color: '#FF9802'},
          5: {color: '#990099'},
          6: {color: '#90A4AF'}
        },
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
