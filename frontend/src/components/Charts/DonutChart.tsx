import { Chart } from 'react-google-charts'
import { ICategoryTotals } from './Charts';

export interface IDonutChartProps {
  chartData: ICategoryTotals
}

export default function DonutChart ({ chartData }: IDonutChartProps) {
    const data = [
        ["Task", "Hours per Day"],
        ["Entertainment", chartData['Entertainment'] ],
        ["Meals", chartData['Meals']],
        ["Groceries", chartData['Groceries']],
        ["Travel", chartData['Travel']],
        ["Shopping", chartData['Shopping']],
        ["Electronics", chartData['Electronics']],
        ["Other", chartData['Other']],
      ];

    const options = {
        title: "Monthly Spending",
        pieHole: 0.4,
        is3D: false,
        slices: {0: {color: '#006EFF'}, 1:{color: '#00FF08'}, 2:{color: 'blue'}, 3: {color: 'red'}, 4:{color: 'grey'}}
      };

  return (
    <div
      className='donut-chart-container w-[50%]'
    >
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}
