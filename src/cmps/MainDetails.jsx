// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

import { Amenities } from "./Amenities"
import { GoogleMap } from "./GoogleMap"
import { Reviews } from "./Reviews"

export function MainDetails({ stay }) {

    // const amenities =stay.amenities.slice(0,3)// use it in the future
    return (
        <section className='main-details'>
            <section className='details-unit'>

                <h2>Entire rental Unit {stay.loc.country},{stay.loc.city}</h2>
                <span>{stay.capacity}</span>-<span>{stay.type}</span>-<span></span>-<span></span>
                <div className='details-user'>
                    <div className="host-things">
                        {stay.rate}, {stay.reviews.length}reviews
                    </div>
                    <img src="" alt="userimg" />
                    <h3>Hosted by user</h3>
                </div>
                <hr />
                <div></div>
                <hr />
                <div className="details-description">
                    <p>{stay.summary}</p>
                </div>
                <hr />

                <div className="details-amenities">
                    <Amenities amenities={stay.amenities} />
                </div>
                <hr />
                <div className="details-reviews">
                    <Reviews reviews={stay.reviews} />
                </div>


                <hr />
                {/* <DateRangeCalendar /> */}
                <div className="google-map-details">
                    <GoogleMap stay={stay} />
                </div>
            </section>

        </section>
    )
}