import { Chart } from 'react-google-charts'
import { useTheme } from '../../context/ThemeContext';
import { ICategoryTotals } from '../../interfaces/ICategoryTotals';

export interface IDonutChartProps {
  chartData: ICategoryTotals
}

export default function DonutChart ({ chartData }: IDonutChartProps) {
  // console.log('donut', chartData)
    const { theme } = useTheme()
    const themeColor = theme === 'dark' ? '#f5f5f5' : 'black'

    const data = [
        ["Task", "Hours per Day"],
        ["Entertainment", chartData['Entertainment'] ],
        ["FoodDrink", chartData['FoodDrink']],
        ["Groceries", chartData['Groceries']],
        ["Travel", chartData['Travel']],
        ["Shopping", chartData['Shopping']],
        ["Utilities", chartData['Utilities']],
        ["Other", chartData['Other']],
      ];

    const options = {
        title: "Distribution",
        titleTextStyle: {
          fontSize: 20,
          color: '#BFBDBF'
        },
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
        backgroundColor: 'none',
        pieSliceBorderColor: 'transparent'
        // 'height': 500
      };

  return (
    <div
      className='donut-chart-container w-[33%] h-[90%] dark:bg-bgDarkMode'
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
