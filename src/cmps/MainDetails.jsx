// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { useState } from "react"
import { Amenities } from "./Amenities"
import Avatar from '@mui/material/Avatar';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
// import Stack from '@mui/material/Stack';

export function MainDetails({ stay }) {
    // const [startDate, setStartDate] = useState(new Date())
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [isOpen, setIsOpen] = useState(true)
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setIsOpen(true)
        }
    }

    const rate = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
    // const amenities =stay.amenities.slice(0,3)// use it in the future
    return (
        <section className='main-user-host'>
            <h2>Entire rental Unit {stay.loc.country},{stay.loc.city}</h2>
            <section className="flex">
                <span>{stay.capacity}</span>-<span>{stay.type}</span>-<span></span>-<span></span>
            </section>
            <div className='details-user'>
                <div className="host-things border">
                    <section className="guest-favorite"><span>Guest favorite</span></section>
                    <span>|</span>{rate / stay.reviews.length} <span>|</span> <section className="review-usr"><span>{stay.reviews.length}</span> <span>reviews</span> </section>
                </div>
                <section className="host-details">
                    <Avatar alt="Travis Howard" src={stay.host.imgUrl} />
                    <section className="host-short">
                        <h4>Hosted by user</h4>
                        <span>2 years hosting</span>
                    </section>
                </section>
            </div>
            <hr />
            <div className="more-details">
                <div><span></span> <p>Free cancellation before</p></div>
                <div><span className="fa-solid fa-paw"></span><p>Furry friends welcome</p></div>
                <div><span></span><p>Great location</p></div>
            </div>
            <hr />
            <div className="details-description">
                <p>{stay.summary}</p>
            </div>
            <hr />

            <div className="details-amenities">
                <Amenities amenities={stay.amenities} />
            </div>
            <hr />
            {/* <MyDateRangePicker/> */}
            <h3>{stay.name} | 5 nights</h3>
            <div className="date-pick-details">
                <DatePicker
                    selected={startDate}
                    onChange={(dates) => {
                        const [start, end] = dates
                        setStartDate(start)
                        setEndDate(end)
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    // inline
                    monthsShown={2}
                    open={isOpen}
                // onClick={() => setIsOpen(true)}
                // onFocus={() => setIsOpen(true)}
                // onBlur={() => setIsOpen(false)}

                />
            </div>
        </section>
    )
}