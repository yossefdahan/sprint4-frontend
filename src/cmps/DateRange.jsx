import React from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

export default function MyDateRangePicker() {
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();
    const [focusedInput, setFocusedInput] = React.useState();

    return (
        <DateRangePicker
            startDate={startDate} // momentPropTypes.momentObj or null
            startDateId="start-date" 
            endDate={endDate} 
            endDateId="end-date" 
            onDatesChange={({ startDate, endDate }) => {
                setStartDate(startDate);
                setEndDate(endDate);
            }}
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null
            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        />
    );
}
