import React, { useEffect, useRef, useState } from 'react'
import { stayService } from '../services/stay.service.local.js'
import { Link, useNavigate, useParams } from "react-router-dom"


export function MultiSelect({ onSetLabel, stay }) {

    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false)
    const labels = stayService.getLabels()


    return <section className="multi-select input" onMouseLeave={() => setIsOptionsModalOpen(false)}>

        <div className="selected-options-container" onClick={() => setIsOptionsModalOpen(prev => !prev)}>

            {!!stay.labels.length && stay.labels.map(label => <div className='input' key={label}>{label},</div>)}
            {!stay.labels.length && <button> no labels yet</button>}
        </div>

        <div className={`options-container  ${isOptionsModalOpen ? ' open' : ''}`}>
            {labels.map(label => <div onClick={() => onSetLabel(label)} key={label}>
                {label} {stay.labels?.includes(label) ? '🟢' : ''}
            </div>
            )}
        </div>
    </section >
}