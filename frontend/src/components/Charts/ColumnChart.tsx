import { Chart } from 'react-google-charts'
import { useState } from 'react'
import { ICategoryTotals } from '../../interfaces/ICategoryTotals'

export interface IColumnChartProps {
    chartData: ICategoryTotals
}

export default function ColumnChart ({ chartData }: IColumnChartProps) {

    const [ mealsTotal, setMealsTotal ] = useState(0)
    const [ travelTotal, setTravelTotal ] = useState(0)
    const [ electronicsTotal, setElectronicsTotal ] = useState(0)
    const [ groceriesTotal, setGroceriesTotal ] = useState(0)
    const [ entertainmentTotal, setEntertainmentTotal ] = useState(0)
    const [ shoppingTotal, setShoppingTotal ] = useState(0)
    const [ otherTotal, setOtherTotal ] = useState(0)


    const data = [
        ["Element", "Total", { role: "style" }],
        ['FoodDrink', chartData['FoodDrink'], '#DC3913'],
        ["Travel", chartData['Travel'], "#3366CC"], // RGB value
        ["Groceries", chartData['Groceries'], "#449F46"], // English color name
        ["Utilities", chartData['Utilities'], "#0199C6"],
        ["Entertainment", chartData['Entertainment'], "#990099"], // CSS-style declaration
        ['Shopping', chartData['Shopping'], '#FF9802'],
        ['Other', chartData['Other'], '#90A4AF'],
      ]

    const options = {
        animation: {
          startup: true,
          duration: 1000,
          easing: 'out',
        },
        chartArea: {
          width: '85%',
          height: '85%',
        },
        // tooltip: {isHtml: true},
        vAxis: {
          format: '$###,##0'
        },
        hAxis: {
          textPosition: 'none'
        },
        bar: { groupWidth: "35%" },
        legend: 'none',
        // 'height': 500
      };
  return (
    <div
      className='column-chart-container w-[33%] h-[90%]'
    >
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="100%"
            data={data}
            options={options}
        />
    </div>
  );
}
