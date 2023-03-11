import { Chart } from 'react-google-charts'
import { useState } from 'react'

export interface IColumnChartProps {
    name: string
}

export default function ColumnChart ({chartData}: any) {
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
        ['Meals', 50, 'blue'],
        ["Travel", 8.94, "#b87333"], // RGB value
        ["Groceries", 10.49, "silver"], // English color name
        ["Electronics", 19.3, "gold"],
        ["Entertainment", 21.45, "color: #e5e4e2"], // CSS-style declaration
        ['Shopping', 23, 'orange'],
        ['Utilities', 23, 'green'],
        ['Other', 23, 'gray'],
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
      };
  return (
    <>
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    </>
  );
}
