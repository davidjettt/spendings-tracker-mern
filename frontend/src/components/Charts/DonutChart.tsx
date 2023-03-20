import { Chart } from 'react-google-charts'
import { ICategoryTotals } from '../../interfaces/ICategoryTotals';

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
        ["Utilities", chartData['Utilities']],
        ["Other", chartData['Other']],
      ];

    const options = {
        title: "Monthly Spending",
        pieHole: 0.4,
        is3D: false,
        slices: {
            0: {color: '#990099'},
            1: {color: '#DC3913'},
            2: {color: '449F46'},
            3: {color: '#3366CC'},
            4: {color: '#FF9802'},
            5: {color: '#0199C6'},
            6: {color: '#90A4AF'}
          },
        legend: 'none',
        // 'height': 500
      };

  return (
    <div
      className='donut-chart-container w-[33%] h-[90%]'
    >
      <Chart
        chartType="PieChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
      />
    </div>
  );
}
