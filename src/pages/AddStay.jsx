import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service.local"
import { Link, useNavigate, useParams } from "react-router-dom"

import { MultiSelect } from '../cmps/MultiSelect.jsx';
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addStay } from "../store/stay.actions"
import { ImgUploader } from "../cmps/ImgUploader.jsx";

export function AddStay() {
    const [stay, setStay] = useState(stayService.getEmptyStay())

    function onUploaded(img) {
        setStay({ ...stay, img })
    }


    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setStay((prevStay) => ({ ...prevStay, [field]: value }))
    }

    function onSetLabel(label) {
        const labels = stay.labels.includes(label) ? stay.labels.filter(l => l !== label) : [label, ...stay.labels]
        setStay(prevStay => ({ ...prevStay, labels }))
    }

    function onSaveStay(ev) {
        ev.preventDefault()
        if (!stay.price) stay.price = 300
        const newStay = {
            ...stay,
            inStock: (stay.inStock === 'true') ? true : false
        }
        addStay(newStay)
            .then(() => {
                showSuccessMsg('Stay Saved!')
                // navigate('/stay')
            })
            .catch(err => {
                console.log('Had issues in Stay details', err)
                showErrorMsg('Had issues in Stay details')
            })
    }




    return <section className="stay-edit">
        <h2> Airstay your home</h2>

        <form onSubmit={onSaveStay} >
            <label htmlFor="name">name of your stay: </label>
            <input className="input" type="text"
                name="name"
                id="name"
                placeholder="Enter name..."
                value={stay.name}
                onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input className="input" type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={stay.price}
                onChange={handleChange}
            />
            <div>
                <MultiSelect onSetLabel={onSetLabel} stay={stay} />
            </div>
            <div className="radio-sort input">
                {/* <label htmlFor="inStock"> in stock?</label> */}
                {/* <select value={stay.inStock} onChange={handleChange} name="inStock" className='edit-input'>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select> */}
            </div>
            <div>
                <ImgUploader onUploaded={onUploaded} />
                {/* <button>{stay._id ? 'Save' : 'Add'}</button> */}
                {/* <button ><Link className="add-btn" to="/stay">Cancel</Link></button>*/}
            </div>
        </form>
    </section>
}