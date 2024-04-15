import React, { useEffect, useRef, useState } from 'react'
import { stayService } from '../services/stay.service.js'
import { Link, useNavigate, useParams } from "react-router-dom"


export function MultiSelectAmenities({ onSetAmenitie, stay }) {

    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false)
    const amenities = stayService.getAmenities().slice(0, 6)


    return <section className="multi-select input" onMouseLeave={() => setIsOptionsModalOpen(false)}>
        <label htmlFor="">amenities</label>
        <div className="selected-options-container" onClick={() => setIsOptionsModalOpen(prev => !prev)}>

            {!!stay.amenities.length && stay.amenities.map(amenitie => <div key={amenitie}>{amenitie},</div>)}
            {!stay.amenities.length && <div> no amenities yet</div>}
        </div>

        <div className={`options-container  ${isOptionsModalOpen ? ' open' : ''}`}>
            {amenities.map(amenitie => <div onClick={() => onSetAmenitie(amenitie)} key={amenitie}>
                {amenitie} {stay.amenities?.includes(amenitie) ? '✔' : ''}
            </div>
            )}
        </div>
    </section >
}

