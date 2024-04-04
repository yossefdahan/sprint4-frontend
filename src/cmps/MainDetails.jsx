// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

import { Amenities } from "./Amenities"
import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';

export function MainDetails({ stay }) {
    const rate = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
    // const amenities =stay.amenities.slice(0,3)// use it in the future
    return (
        <section className='main-details'>
            <section className='details-unit'>

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
                    <div><h3>Free cancellation before</h3></div>
                    <div><h3>Dive right in</h3></div>
                    <div><h3>Highly rated Host</h3></div>
                </div>
                <hr />
                <div className="details-description">
                    <p>{stay.summary}</p>
                </div>
                <hr />

                <div className="details-amenities">
                    <Amenities amenities={stay.amenities} />
                </div>


                {/* <DateRangeCalendar /> */}

            </section>
        
        </section>
    )
}