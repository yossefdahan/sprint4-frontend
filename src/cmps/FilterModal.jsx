import { useEffect, useState } from "react";
import { stayService } from "../services/stay.service";

export function FilterModal({ setIsOpen, isOpen, filterBy, onSetFilter }) {

    const [localFilter, setLocalFilter] = useState({
        roomType: 'Any type',
        bedrooms: 'Any',
        beds: 'Any',
        bathrooms: 'Any',
        amenities: []
    });

    function handleSubmit(ev) {
        ev.preventDefault();
        onSetFilter({
            ...filterBy,
            ...localFilter
        });
        setIsOpen(false)
    }

    function handleAmenityChange(e) {
        const value = e.target.value;
        const updatedAmenities = e.target.checked
            ? [...localFilter.amenities, value]
            : localFilter.amenities.filter((amenity) => amenity !== value)

        setLocalFilter(prevState => ({
            ...prevState,
            amenities: updatedAmenities
        }))
    }

    function handleChange(filterName, value) {
        setLocalFilter(prevState => ({
            ...prevState,
            [filterName]: value
        }))
    }

    const amenities = stayService.getAmenities()
    const amenitiesPreview = amenities.slice(0, 6);

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
                                {['Any type', 'Private room', 'Entire home/apt'].map((t) => (
                                    <button key={t} type="button" onClick={() => handleChange('roomType', t)} className={`modal__button ${localFilter.roomType === t ? 'filter-modal__button--active' : ''}`}>
                                        {t === 'Entire home/apt' ? 'Entire home' : t === 'Private room' ? 'Room' : t === 'Any type' ? 'Any type' : ''}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="roomsbed">
                            <h3 className="filter-modal__section-title">Rooms and beds</h3>
                            <div className="filter-modal__options">
                                <div className="filter-modal__options-row">
                                    <h4 className="filter-modal__options-title">Bedrooms</h4>
                                    <div className="btn_choose">
                                        {['Any', '1', '2', '3', '4', '5', '6', '7', '8+'].map((number) => (
                                            <button key={number} onClick={() => handleChange('bedrooms', number)} className={`modal__button ${localFilter.bedrooms === number ? 'filter-modal__button--active' : ''}`}>
                                                {number}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="filter-modal__options-row">
                                    <h4 className="filter-modal__options-title">Beds</h4>
                                    <div className="btn_choose">
                                        {['Any', '1', '2', '3', '4', '5', '6', '7', '8+'].map((number) => (
                                            <button key={number} onClick={() => handleChange('beds', number)} className={`modal__button ${localFilter.beds === number ? 'filter-modal__button--active' : ''}`}>
                                                {number}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="filter-modal__options-row">
                                    <h4 className="filter-modal__options-title">Bathrooms</h4>
                                    <div className="btn_choose">
                                        {['Any', '1', '2', '3', '4', '5', '6', '7', '8+'].map((number) => (
                                            <button key={number} onClick={() => handleChange('bathrooms', number)} className={`modal__button ${localFilter.bathrooms === number ? 'filter-modal__button--active' : ''}`}>
                                                {number}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="amenties-filter">
                            <h3 className="filter-modal__section-title">Amenities</h3>
                            <div className="amenties-section">
                                <h4 className="filter-modal__section-title">Essentials</h4>
                                <div className="amenties-options flex column">
                                    {amenitiesPreview.map((a, idx) =>
                                        <label key={idx}>
                                            <input type="checkbox" name={a} value={a} onChange={handleAmenityChange} checked={localFilter.amenities.includes(a)} />
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
    );
}
