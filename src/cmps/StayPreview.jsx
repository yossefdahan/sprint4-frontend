import { useState } from 'react';
import { Link } from "react-router-dom"
import { utilService } from "../services/util.service"
import { StayGallery } from "./StayGallery"
import { updateStay } from '../store/stay.actions';
import { useSelector } from 'react-redux';


export function StayPreview({ stay, shouldShowActionBtns, onRemoveStay, onUpdateStay }) {
    const [isSaved, setIsSaved] = useState(false);
    const user = useSelector(storeState => storeState.userModule.user)

    async function handleSave(ev) {
        ev.stopPropagation();
        const stayToSave = { ...stay, likedByUsers: [...stay.likedByUsers, user._id] }
        try {
            const savedStay = await updateStay(stayToSave)
            setIsSaved(!isSaved);
            console.log(savedStay, 'is saved!!')
        } catch (err) {
            console.log(err, 'israel and his shit')
        }

    }

    const correctedLng = ((394.891562 % 360) + 360) % 360
    const myLoc = { lat: 31.829550, lng: correctedLng }
    if (!stay) return <div className='loading'>loading....</div>
    const distanceInKm = utilService.haversineDistance(myLoc, stay.loc)
    const { checkOut, checkIn } = utilService.formatStayDateRange(stay)
    const { stars, averageRating } = utilService.getStarsWithRating(stay)
    const rate = stay.reviews && stay.reviews.length > 0
        ? stay.reviews.reduce((acc, review) => acc + review.rate, 0) / stay.reviews.length
        : 0



    return (
        <section className='stay-card' >
            <div className="stay-preview" >

                <StayGallery
                    imgUrls={stay.imgUrls}
                    isSaved={isSaved}
                    onSave={handleSave}
                    stayId={stay._id}
                    heartClassName={isSaved ? 'saved' : ''}
                    user={user}
                    stay={stay}

                />

                <div className='preview-details'>
                    <Link className="go-to-details" to={`/stay/${stay._id}`} >
                        <div className="header-preview">
                            <h4 className="stay-location-preview"><span>{stay.loc.city}</span>, <span>{stay.loc.country}</span></h4>
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

