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
            <Link className="go-to-details" to={`/${stay._id}`} >
                <div className="stay-preview" >
                    <StayGallery
                        imgUrls={stay.imgUrls}
                        isSaved={isSaved}
                        onSave={handleSave} />
                    <div className='preview-details'>
                        <div className="header-preview">
                            <h4 className="stay-location-preview"><span>{stay.loc.country}</span>, <span>{stay.loc.countryCode}</span></h4>
                            <span className="review-preview">★{rate / stay.reviews.length < 4 ? '' : rate / stay.reviews.length}</span>
                        </div>
                        <p className="km-away">2,138 kilometers away</p>
                        <p className="date-stay-preview"><span>Apr</span> <span>7-12</span></p>
                        <p className="stay-preview-price">${stay.price} night</p>
                    </div>
                    {shouldShowActionBtns(stay) && <div>
                        <button onClick={() => { onRemoveStay(stay._id) }}>x</button>
                        <button onClick={() => { onUpdateStay(stay) }}>Edit</button>
                    </div>}

                    {/* <button onClick={() => { onAddStayMsg(stay) }}>Add stay msg</button> */}
                    {/* <button className="buy" onClick={() => { onAddToCart(stay) }}>Add to cart</button> */}
                </div>
            </Link>
        </section >
    )
}

