import React, { useEffect, useRef, useState } from 'react'
import { stayService } from '../services/stay.service.local.js'
import { Link, useNavigate, useParams } from "react-router-dom"


export function MultiSelect({ onSetLabel, stay }) {

    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false)
    const labels = stayService.getLabels().slice(0,6)


    return <section className="multi-select input" onMouseLeave={() => setIsOptionsModalOpen(false)}>
        <label >labels</label>
        <div className="selected-options-container" onClick={() => setIsOptionsModalOpen(prev => !prev)}>

            {!!stay.labels.length && stay.labels.map(label => <div key={label}>{label},</div>)}
            {!stay.labels.length && <div> no labels yet</div>}
        </div>

        <div className={`options-container  ${isOptionsModalOpen ? ' open' : ''}`}>
            {labels.map(label => <div onClick={() => onSetLabel(label)} key={label}>
                {label} {stay.labels?.includes(label) ? '🟢' : ''}
            </div>
            )}
        </div>
    </section >
}