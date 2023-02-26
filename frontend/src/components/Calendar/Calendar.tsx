import { useState } from "react";
import Datepicker from 'react-tailwindcss-datepicker'


export default function Calendar () {
    const [ date, setDate ] = useState(null)

    const handleDateChange = (newDate: any) => {
        console.log('new value', newDate)
        setDate(newDate.startDate)
    }

  return (
    <div className="w-90 border rounded">
        <Datepicker
            value={date}
            onChange={handleDateChange}
            useRange={false}
            asSingle={true}
        />
    </div>
  );
}
