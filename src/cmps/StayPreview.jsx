import { useState } from 'react';
import { Link } from "react-router-dom"
import { utilService } from "../services/util.service"
import { StayGallery } from "./StayGallery"


export function StayPreview({ stay, shouldShowActionBtns, onRemoveStay, onUpdateStay }) {
    const [isSaved, setIsSaved] = useState(false);

    const rate = stay.reviews.reduce((acc, review) => acc + review.rate, 0)

    const handleSave = (ev) => {
        ev.stopPropagation();
        setIsSaved(!isSaved);
    };

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
                    <Link className="go-to-details" to={`/${stay._id}`} >
                        <div className="header-preview">
                            <h4 className="stay-location-preview"><span>{stay.loc.country}</span>, <span>{stay.loc.countryCode}</span></h4>
                            <span className="review-preview">★{rate / stay.reviews.length < 4 ? '' : rate / stay.reviews.length}</span>
                        </div>
                        <p className="km-away">2,138 kilometers away</p>
                        <p className="date-stay-preview"><span>Apr</span> <span>7-12</span></p>
                        <p className="stay-preview-price"><span>${stay.price}</span> night</p>
                    </Link>
                </div>


            </div>
        </section >
    )
}

