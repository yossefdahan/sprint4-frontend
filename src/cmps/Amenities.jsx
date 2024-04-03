

export function Amenities({ amenities }) {



    return (
        <div className="amenities-container">
            <h3>What this place offers</h3>
            {amenities.map((amen) => {
                return (
                    <p key={amen}><span>😎</span> {amen}</p>
                )
            })}
            <button>Show all {amenities.length} amenities</button>
        </div>
    )
}