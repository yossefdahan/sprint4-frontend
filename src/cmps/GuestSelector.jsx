


export function GuestSelector({ guestType, guestCounts, updateGuestCount }) {
    const descriptions = {
        adults: 'Ages 13 or above',
        children: 'Ages 2 – 12',
        infants: 'Under 2',
        pets: 'Bringing a service animal?'
    }

    return (
        <div className="guest-selector">
            <h4>{guestType.charAt(0).toUpperCase() + guestType.slice(1)}</h4>
            {/* {guestType === "adults" && <h5>Ages 13 or above</h5>}
            {guestType === "children" && <h5>Ages 2 – 12</h5>}
            {guestType === "infants" && <h5>Under 2</h5>}
            {guestType === "pets" && <h5>Bringing a service animal?</h5>} */}
            <h5>{descriptions[guestType]}</h5>
            <button type="button" className={guestCounts[guestType] <= 0 ? 'button-disabled' : ''} disabled={guestCounts[guestType] <= 0} style={{ opacity: guestCounts[guestType] <= 0 ? 0.5 : 1 }} onClick={(event) => {
                event.stopPropagation();
                updateGuestCount(guestType, -1);
            }}>-</button>
            <span>{guestCounts[guestType]}</span>
            <button type="button" className={((guestType === 'adults' || guestType === 'children') && (guestCounts.adults + guestCounts.children >= 16) ||
                (guestType === 'infants' && guestCounts.infants >= 5) ||
                (guestType === 'pets' && guestCounts.pets >= 5)) ? 'button-disabled' : ''}
                style={{
                    opacity: ((guestType === 'adults' || guestType === 'children') && (guestCounts.adults + guestCounts.children >= 16) ||
                        (guestType === 'infants' && guestCounts.infants >= 5) ||
                        (guestType === 'pets' && guestCounts.pets >= 5)) ? 0.5 : 1
                }}
                disabled={(guestType === 'adults' || guestType === 'children') && (guestCounts.adults + guestCounts.children >= 16) ||
                    (guestType === 'infants' && guestCounts.infants >= 5) ||
                    (guestType === 'pets' && guestCounts.pets >= 5)}
                onClick={(event) => {
                    event.stopPropagation();
                    updateGuestCount(guestType, 1);
                }}>+</button>
        </div>
    )
}