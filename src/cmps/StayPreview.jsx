import { useState } from 'react';
import { Link } from "react-router-dom"
import { utilService } from "../services/util.service"
import { StayGallery } from "./StayGallery"


export function StayPreview({ stay, shouldShowActionBtns, onRemoveStay, onUpdateStay }) {
    const [isSaved, setIsSaved] = useState(false);

    
    const handleSave = (ev) => {
        ev.stopPropagation();
        setIsSaved(!isSaved);
    };
    
    const correctedLng = ((394.891562 % 360) + 360) % 360
    const myLoc = { lat: 31.829550, lng: correctedLng }
    if(!stay)return <div>loading....</div>
    const distanceInKm = utilService.haversineDistance(myLoc, stay.loc)
    const { checkOut, checkIn } = utilService.formatStayDateRange(stay)
    const { stars, averageRating } = utilService.getStarsWithRating(stay)
    const rate = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
    return (
        <section className='stay-card' >
            <div className="stay-preview" >

                <StayGallery
                    imgUrls={stay.imgUrls}
                    isSaved={isSaved}
                    onSave={handleSave}
                    stayId={stay._id}
                    heartClassName={isSaved ? 'saved' : ''}

                />

                <div className='preview-details'>
                    <Link className="go-to-details" to={`/stay/${stay._id}`} >
                        <div className="header-preview">
                            <h4 className="stay-location-preview"><span>{stay.loc.country}</span>, <span>{stay.loc.countryCode}</span></h4>
                            {!!rate && <span className="review-preview">{!averageRating ? 'Not rated yet' : (averageRating > 3.9) ? `★ ${averageRating}` : ''}</span>}
                        </div>
                        <p className="km-away">{distanceInKm.toFixed(0)} kilometers away</p>
                        <p className="date-stay-preview">{checkIn}-{checkOut}</p>
                        <p className="stay-preview-price"><span>${stay.price}</span> <span className='night-preview'>night</span> </p>
                    </Link>
                </div>


            </div>
        </section >
    )
}

