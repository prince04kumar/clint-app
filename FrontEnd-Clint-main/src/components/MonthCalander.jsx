import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./component.css" // Add your custom CSS here

function MonthCalander({ dateData }) {
    const [date, setDate] = useState(new Date());
    // console.log(dateData)
    if (dateData == undefined) {
        return "no data available"
    }

    // List of dates to highlight
    const specialDates = dateData.map((dt) => new Date(date.getFullYear(), date.getMonth(), dt));

    const onChange = (newDate) => {
        setDate(newDate);
    };

    const tileClassName = ({ date, view }) => {
        // Add a custom class to the tiles that match the special dates
        if (view === 'month' && specialDates.some(d => d.toDateString() === date.toDateString())) {
            return 'highlight';
        }
    };

    return (
        <div>
            <Calendar
                onChange={onChange}
                // value={date}
                tileClassName={tileClassName}
            />
        </div>
    );
}

export default MonthCalander;