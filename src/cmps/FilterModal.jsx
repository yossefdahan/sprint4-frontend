
import { useEffect, useState } from "react";
import { stayService } from "../services/stay.service.local";



export function FilterModal({ setIsOpen, isOpen, filterBy, onSetFilter }) {
    const [type, setType] = useState('Any type')
    const [priceRange, setPriceRange] = useState({ min: 40, max: 930 });
    const [bedrooms, setBedrooms] = useState('Any');
    const [beds, setBeds] = useState('Any');
    const [bathrooms, setBathrooms] = useState('Any');
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    function handleSubmit(ev) {
        ev.preventDefault();
        const filter = {
            ...filterBy,
            type,
            bedrooms,
            beds,
            bathrooms,
            amenities: selectedAmenities,
        }
        setIsOpen(false)
        onSetFilter(filter);
    }

    function handleAmenityChange(e) {
        const value = e.target.value;
        setSelectedAmenities(
            e.target.checked
                ? [...selectedAmenities, value]
                : selectedAmenities.filter((amenity) => amenity !== value)
        )
    }


    const amenities = stayService.getAmenities()
    const amenitiesPreview = amenities.slice(0, 6)
    return (
        <div className="filter-modal">
            <form onSubmit={handleSubmit}>
                <div className="filter-modal-header">
                    <button className="filter-modal__close-btn" onClick={() => setIsOpen(!isOpen)}>x</button>
                    <h2 className="filter-modal__title">Filters</h2>
                </div>
                <div className="contact-details">
                    <div className="filter-modal-content">
                        <h3 className="filter-modal__section-title">
                            Type of place
                        </h3>
                        <p>Search rooms, entire homes, or any type of place</p>
                        <div className="type-bnb">
                            <div className="bnb-op">
                                {['Any type', 'Room', 'Entire home'].map((t) => (
                                    <button key={t} type="button" onClick={() => setType(t)} className={`modal__button ${t === type ? 'filter-modal__button--active' : ''}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <div className=" roomsbed">
                            <h3 className="filter-modal__section-title">Rooms and beds</h3>

                            <div className="filter-modal__options">
                                <div className="filter-modal__options-row">
                                    <h4 className="filter-modal__options-title">Bedrooms</h4>
                                    <div className="btn_choose">
                                        {['Any', '1', '2', '3', '4', '5', '6', '7', '8+'].map((number, index) => (
                                            <button key={index} onClick={() => setBedrooms(number)} className={`modal__button ${number === '2' ? 'filter-modal__button--active' : ''}`}>
                                                {number}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="filter-modal__options-row">
                                    <h4 className="filter-modal__options-title">Beds</h4>
                                    <div className="btn_choose">
                                        {['Any', '1', '2', '3', '4', '5', '6', '7', '8+'].map((number, index) => (
                                            <button key={index} onClick={() => setBeds(number)} className={`modal__button ${number === 'Any' ? 'filter-modal__button--active' : ''}`}>
                                                {number}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="filter-modal__options-row">
                                    <h4 className="filter-modal__options-title">Bathrooms</h4>
                                    <div className="btn_choose">
                                        {['Any', '1', '2', '3', '4', '5', '6', '7', '8+'].map((number, index) => (
                                            <button key={index} onClick={() => setBathrooms(number)} className={`modal__button ${number === 'Any' ? 'filter-modal__button--active' : ''}`}>
                                                {number}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="propety-type">
                            <h3 className="filter-modal__section-title">Property type</h3>
                            <div className="propety-options">
                                <div className="pro house">House</div>
                                <div className="pro Aprt">Apartment</div>
                                <div className="pro Guest">Guesthouse</div>
                                <div className="pro hotel">Hotel</div>
                            </div>
                        </div>
                        <div className="amenties-filter">
                            <h3 className="filter-modal__section-title">Amenities</h3>
                            <div className="amenties-section">
                                <h4 className="filter-modal__section-title">Essentials</h4>
                                <div className="amenties-options flex column">
                                    {amenitiesPreview.map((a, idx) =>
                                        <label key={idx} >
                                            <input type="checkbox" name={a} value={a} onChange={handleAmenityChange} />
                                            {a}
                                        </label>
                                    )}
                                </div>
                                <div>
                                    <div className="show-more-desc">
                                        <span className="text-show-more">show more</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="filter-modal-footer flex">
                        <button type="reset" className="show-btn-clear" >clear all</button>
                        <button type="submit" className="show-btn" >Show places</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
