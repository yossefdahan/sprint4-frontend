

export function Amenities({ amenities }) {



    return (
        <div className="amenities-container">
            <h3 className="amenities-title">What this place offers</h3>
            <div className="amenities-icons-section">{amenities.map((amen) => {
                return (
                    <p key={amen}><i class="fa-brands fa-airbnb"></i>{amen}</p>
                )
            })}
            </div>
            <button>Show all {amenities.length} amenities</button>
        </div>
    )
}