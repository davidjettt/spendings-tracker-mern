import { ChangeEvent } from "react";

export interface IChartFilterProps {
    setFilterMonth: React.Dispatch<React.SetStateAction<string>>
    setFilterYear: React.Dispatch<React.SetStateAction<string>>
}

export default function ChartFilter (props: IChartFilterProps) {

    const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setFilterMonth(e.target.value)
    }

    const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setFilterYear(e.target.value)
    }


  return (
        <div
            className="date-filter-container w-[5%] flex"
        >
            <label
                className="flex flex-col"
                htmlFor="year-filter"
            >
                Year
                <select
                    id='year-filter'
                    className="year-filter"
                    onChange={handleYearChange}
                >
                    <option value='2023'>2023</option>
                    <option value='2022'>2022</option>
                    <option value='2021'>2021</option>
                </select>
            </label>
            <label
                className="flex flex-col"
                htmlFor="month-filter"
            >
                Month
                <select
                    id='month-filter'
                    className="month-filter"
                    onChange={handleMonthChange}
                >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                </select>
            </label>
        </div>
  );
}
