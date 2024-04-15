import { useEffect, useState, useRef } from "react";
import { stayService } from "../services/stay.service";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
export function FilterModal({ setIsOpen, isOpen, filterBy, onSetFilter }) {

    const [localFilter, setLocalFilter] = useState({
        roomType: 'Any type',
        bedrooms: 'Any',
        beds: 'Any',
        bathrooms: 'Any',
        amenities: [],
        minPrice: '',
        maxPrice: '',
    });

    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);



    function handleSubmit(ev) {
        ev.preventDefault();
        onSetFilter({
            ...filterBy,
            ...localFilter
        });
        setIsOpen(false)
    }

    function handlePriceChange(values) {
        setLocalFilter(prevState => ({
            ...prevState,
            minPrice: values[0],
            maxPrice: values[1]
        }));
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

    function handleChange(filterName, value, ev) {
        ev.preventDefault()
        setLocalFilter(prevState => ({
            ...prevState,
            [filterName]: value
        }))
    }

    const amenities = stayService.getAmenities()
    const amenitiesPreview = amenities.slice(0, 6);

    return (
        <div className="filter-modal" ref={modalRef}>
            <form onSubmit={handleSubmit}>
                <div className="filter-modal-header">
                    <button className="__close-btn" onClick={() => setIsOpen(!isOpen)}>x</button>
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
                                    <button key={t} type="button" onClick={(e) => handleChange('roomType', t, e)} className={`modal__button ${localFilter.roomType === t ? 'modal__button--active' : ''}`}>
                                        {t === 'Entire home/apt' ? 'Entire home' : t === 'Private room' ? 'Room' : t === 'Any type' ? 'Any type' : ''}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-modal__options-row">
                            <h4 className="filter-modal__options-title">Price Range</h4>

                            <div>
                                <Slider
                                    range
                                    min={0}
                                    max={1000}
                                    value={[localFilter.minPrice, localFilter.maxPrice]}
                                    onChange={handlePriceChange}
                                />
                                <div>Price range: ${localFilter.minPrice} - ${localFilter.maxPrice}</div>
                            </div>
                        </div>

                        <div className="roomsbed">
                            <h3 className="filter-modal__section-title">Rooms and beds</h3>
                            <div className="filter-modal__options">
                                <div className="filter-modal__options-row">
                                    <h4 className="filter-modal__options-title">Bedrooms</h4>
                                    <div className="btn_choose">
                                        {['Any', '1', '2', '3', '4', '5', '6', '7', '8+'].map((number) => (
                                            <button key={number} onClick={(e) => handleChange('bedrooms', number, e)} className={`modal__button ${localFilter.bedrooms === number ? 'modal__button--active' : ''}`}>
                                                {number}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {/* <div className="filter-modal__options-row">
                                    <h4 className="filter-modal__options-title">Beds</h4>
                                    <div className="btn_choose">
                                        {['Any', '1', '2', '3', '4', '5', '6', '7', '8+'].map((number) => (
                                            <button key={number} onClick={() => handleChange('beds', number)} className={`modal__button ${localFilter.beds === number ? 'modal__button--active' : ''}`}>
                                                {number}
                                            </button>
                                        ))}
                                    </div>
                                </div> */}
                                <div className="filter-modal__options-row">
                                    <h4 className="filter-modal__options-title">Bathrooms</h4>
                                    <div className="btn_choose">
                                        {['Any', '1', '2', '3', '4', '5', '6', '7', '8+'].map((number) => (
                                            <button key={number} onClick={(e) => handleChange('bathrooms', number, e)} className={`modal__button ${localFilter.bathrooms === number ? 'modal__button--active' : ''}`}>
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
