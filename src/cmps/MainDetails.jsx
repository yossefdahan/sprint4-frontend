// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { useRef, useState } from "react"
import { Amenities } from "./Amenities"
import Avatar from '@mui/material/Avatar';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { utilService } from "../services/util.service";
// import Stack from '@mui/material/Stack';

export function MainDetails({ stay, filterBy, onSetFilter }) {
    // const [startDate, setStartDate] = useState(new Date())
    // const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [isOpen, setIsOpen] = useState(true)

    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setIsOpen(true)
        }
    }

    const { stars, averageRating } = utilService.getStarsWithRating(stay)

    const rate = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
    // const amenities =stay.amenities.slice(0,3)// use it in the future
    return (
        <section className='main-user-host'>
            <h2 className="second-title-details">Entire rental Unit {stay.loc.country},{stay.loc.city}</h2>
            <section className=" house-details flex">
                <span>{stay.capacity} guests</span> • <span>{stay.type}</span> • <span> 1 bedroom</span>•<span> 1bed</span>
            </section>

            <div className='details-user'>
                <div className="host-things border">
                    {averageRating > 4.5 && (
                        <section className="guest-favorite">
                            <img src="public/img/guest-fav.png"></img>
                        </section>
                    )}
                    {averageRating > 4.5 && <span>|</span>}

                    <div className="reviews-details-stars">
                        <div className="rate-details">{rate / stay.reviews.length}</div>
                        <div className="stars-details">{stars}</div>
                    </div>
                    <span>|</span>
                    <section className="review-usr"><span className="num-reviews">{stay.reviews.length} </span> <span className="reviews-span">Reviews</span> </section>
                </div>

                <section className="host-details">
                    <Avatar alt="Travis Howard" src={stay.host.imgUrl} />
                    <section className="host-short">
                        <h4 className="host-name-details">Hosted by {stay.host.fullname}</h4>
                        <p>Superhost • 2 years hosting</p>
                    </section>
                </section>
            </div>
            <hr className="hr-line-details" />

            <div className="more-details">
                <div className="flex"><span><i className="fa-regular fa-calendar"></i></span><p>Free cancellation for 48 hours</p></div>
                <div className="flex"><span><i className="fa-solid fa-paw"></i></span><p>Furry friends welcome</p></div>
                <div className="flex"><span><i className="fa-brands fa-product-hunt"></i></span><p>Park for free</p></div>
            </div>

            <hr className="hr-line-details" />

            <div className="details-description">
                <p>{stay.summary}</p>
            </div>
            <hr />

            <div className="details-amenities">
                <Amenities amenities={stay.amenities} />
            </div>
            <hr className="hr-line-details" />

            {/* <MyDateRangePicker/> */}
            <div className="date-pick-details">
                <h3 className="title-dates-details"> {utilService.getNumOfDays(filterBy.checkIn, filterBy.checkOut)} Nights in {stay.name}  </h3>
                <DatePicker
                    selected={filterBy.checkIn}
                    onChange={(dates) => {
                        const [start, end] = dates
                        onSetFilter.current({
                            ...filterBy,
                            checkIn: start,
                            checkOut: end
                        })
                    }}
                    startDate={filterBy.checkIn}
                    endDate={filterBy.checkOut}
                    selectsRange

                    monthsShown={2}
                    open={isOpen}

                />
            </div>
        </section >
    )
}