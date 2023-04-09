import { ChangeEvent } from "react";
import { useTheme } from "../../context/ThemeContext";

interface IChartFilterProps {
    setFilterMonth: React.Dispatch<React.SetStateAction<string>>
    setFilterYear: React.Dispatch<React.SetStateAction<string>>
}

export default function ChartFilter (props: IChartFilterProps) {
    // const { theme } = useTheme()

    const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setFilterMonth(e.target.value)
    }
    const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setFilterYear(e.target.value)
    }

  return (
        <div
            className="date-filter-container w-[97%] flex justify-start gap-2 ml-5 mt-2"
        >
            <label
                className="flex flex-col items-center text-gray75"
                htmlFor="year-filter"
            >
                Year
                <select
                    id='year-filter'
                    className={`year-filter bg-offWhite dark:bg-bgDarkMode rounded-md focus:outline-none p-2 border`}
                    onChange={handleYearChange}
                >
                    <option value='2023'>2023</option>
                    <option value='2022'>2022</option>
                </select>
            </label>
            <label
                className="flex flex-col items-center text-gray75"
                htmlFor="month-filter"
            >
                Month
                <select
                    id='month-filter'
                    className={`month-filter bg-offWhite dark:bg-bgDarkMode rounded-md focus:outline-none p-2 border`}
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
