import { Link } from "react-router-dom"

import { utilService } from "../services/util.service"
import { StayGallery } from "./StayGallery"


export function StayPreview({ stay, shouldShowActionBtns, onRemoveStay, onUpdateStay }) {

    const rate = stay.reviews.reduce((acc, review) => acc + review.rate, 0)

    return (
        <Link to={`/${stay._id}`} className="link-no-decoration" >
            <StayGallery imgUrls={stay.imgUrls} />
            <li className="stay-preview" >
                <div className="header-preview">
                    <h4><span>{stay.loc.country}</span>, <span>{stay.loc.countryCode}</span></h4>
                    <span>{rate / stay.reviews.length < 4 ? '' : rate / stay.reviews.length}</span>
                </div>
                <p><span>2,138 kilometers away</span></p>
                <p><span>Apr 7-12</span></p>
                <p><span>${stay.price}</span><span>night</span></p>
                {shouldShowActionBtns(stay) && <div>
                    <button onClick={() => { onRemoveStay(stay._id) }}>x</button>
                    <button onClick={() => { onUpdateStay(stay) }}>Edit</button>
                </div>}

                {/* <button onClick={() => { onAddStayMsg(stay) }}>Add stay msg</button> */}
                {/* <button className="buy" onClick={() => { onAddToCart(stay) }}>Add to cart</button> */}
            </li>
        </Link>
    )
}