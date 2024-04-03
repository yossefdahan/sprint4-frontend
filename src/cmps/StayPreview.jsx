import { Link } from "react-router-dom"

import { utilService } from "../services/util.service"


export function StayPreview({ stay, shouldShowActionBtns, onRemoveStay, onUpdateStay }) {



    return (
        <Link to={`/${stay._id}`} className="link-no-decoration" >
            <li className="stay-preview" >
                <img src={stay.imgUrls[0]} alt="" />

                <h4><span>{stay.loc.country}</span>, <span>{stay.loc.countryCode}</span></h4>
                <p><span>2,138 kilometers away</span></p>
                <p><span>Apr 7-12</span></p>
                <p><span>${stay.price}</span> <span>night</span></p>
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