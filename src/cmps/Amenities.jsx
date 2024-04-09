import { useState } from "react"


export function Amenities({ amenities }) {

    const initialVisibleCount = 5
    const [visibleAmenities, setVisibleAmenities] = useState(amenities.slice(0, initialVisibleCount))
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleAmenities = () => {
        if (isExpanded) {
            setVisibleAmenities(amenities.slice(0, initialVisibleCount))
            setIsExpanded(false)
        } else {
            setVisibleAmenities(amenities)
            setIsExpanded(true)
        }
    }

    return (
        <div className="amenities-container" >
            <h3 className="amenities-title">What this place offers</h3>
            <div className="amenities-icons-section">
                {visibleAmenities.map((amen) => (
                    <p key={amen}><img src={`/amenities/${amen}.svg`} style={{ width: "24px" }} alt="" /> {amen}</p>
                ))}
            </div>
            {amenities.length > initialVisibleCount && (
                <button onClick={toggleAmenities}>
                    {isExpanded ? 'Show less' : `Show all amenities`}
                </button>
            )}
        </div>
    )
}