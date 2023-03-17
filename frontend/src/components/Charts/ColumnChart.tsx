import { Chart } from 'react-google-charts'
import { useState } from 'react'
import { ICategoryTotals } from './Charts'

export interface IColumnChartProps {
    chartData: ICategoryTotals
}

export default function ColumnChart ({ chartData }: IColumnChartProps) {
   /**
    TODO Figure out how to send data to charts
    Option 1: send 1 big object and then extract data to save in state in chart component
    Option 2: Extract data & save to state in Charts component and then send as a prop
    */


    const [ mealsTotal, setMealsTotal ] = useState(0)
    const [ travelTotal, setTravelTotal ] = useState(0)
    const [ electronicsTotal, setElectronicsTotal ] = useState(0)
    const [ groceriesTotal, setGroceriesTotal ] = useState(0)
    const [ entertainmentTotal, setEntertainmentTotal ] = useState(0)
    const [ shoppingTotal, setShoppingTotal ] = useState(0)
    const [ otherTotal, setOtherTotal ] = useState(0)


    const data = [
        ["Element", "Density", { role: "style" }],
        ['Meals', chartData['Meals'], '#0CBBD4'],
        ["Travel", chartData['Travel'], "#FFEB3F"], // RGB value
        ["Groceries", chartData['Groceries'], "#449F46"], // English color name
        ["Electronics", chartData['Electronics'], "#E63936"],
        ["Entertainment", chartData['Entertainment'], "#CC8899"], // CSS-style declaration
        ['Shopping', chartData['Shopping'], '#FF9802'],
        ['Utilities', 23, 'green'],
        ['Other', chartData['Other'], '#90A4AF'],
      ]

    console.log('data', chartData)

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
        bar: { groupWidth: "35%" }
      };
  return (
    <div
      className='column-chart-container w-[50%]'
    >
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    </div>
  );
}
