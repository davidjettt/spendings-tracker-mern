import { Chart } from 'react-google-charts'
import { useTheme } from '../../context/ThemeContext'

interface IBarChartProps {
  threeMonthChartData: (string | number)[]
}

export default function BarChart ({ threeMonthChartData }: IBarChartProps) {
  const { theme } = useTheme()
  const themeColor = theme === 'dark' ? '#f5f5f5' : 'black'

  const data = threeMonthChartData.length ? [
    ["Month", "Entertainment", "Food & Drink", "Groceries", "Other", "Shopping", "Travel", "Utilities"],
    ...threeMonthChartData
  ] : [
    ["Month", "Entertainment", "Food & Drink", "Groceries", "Other", "Shopping", "Travel", "Utilities"],
    ['',0,0,0,0,0,0,0]
  ]



  const options = {
    animation: {
      startup: true,
      duration: 1000,
      easing: 'out',
    },
    title: "3 Month Total",
    titleTextStyle: {
      fontSize: 20,
      color: '#BFBDBF'
    },
    chartArea: { width: "50%" },
    isStacked: true,
    hAxis: {
      title: "",
      minValue: 0,
      format: 'currency',
      textStyle: {
        color: '#BFBDBF'
      },
    },
    vAxis: {
      textStyle: {
        color: '#BFBDBF'
      }
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
    legend: 'none',
    backgroundColor: 'none',
    barSliceBorderColor: 'transparent'
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
