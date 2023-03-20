import './ChartLegend.css'

export interface IChartLegendProps {
}

export default function ChartLegend (props: IChartLegendProps) {
  return (
    <div
        className='legend-outer-container w-full h-[10%] flex justify-center'
    >
        <div
            className='legend-inner-container w-[60%] flex justify-evenly odd:text-sm even:text-sm'
        >
            <span className='entertainment'>
                ⚫️ Entertainment
            </span>
            <span className='utilities'>
                ⚫️ Utilities
            </span>
            <span className='travel'>
                ⚫️ Travel
            </span>
            <span className='groceries'>
                ⚫️ Groceries
            </span>
            <span className='meals'>
                ⚫️ Meals
            </span>
            <span className='shopping'>
                ⚫️ Shopping
            </span>
            <span className='other'>
                ⚫️ Other
            </span>
        </div>

    </div>
  );
}
