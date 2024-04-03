import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

export function MainDetails({ stay }) {

    // const amenities =stay.amenities.slice(0,3)// use it in the future
    return (
        <section className='main-details'>
            <section className='details-unit'>
                <h2>Entire rental Unit|{stay.loc.country},{stay.loc.city}</h2>
                <span>{stay.capacity}</span>-<span>{stay.type}</span>-<span></span>-<span></span>
                <div className='details-user'>
                    <div className="host-things">
                        {stay.rate}|{stay.reviews.length}reviews
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
                    {stay.amenities.map((a) => {
                        <span>{a}</span>
                    })}
                    <button>show all{stay.amenities.length} amenities </button>
                </div>
                <DateRangeCalendar />
            </section>

        </section>
    )
}