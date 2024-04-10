
import { useEffect, useState } from "react";



export function FilterModal({ setIsOpen, isOpen, filterBy }) {
    const [typeOfPlace, setTypeOfPlace] = useState('Any type');
    const [priceRange, setPriceRange] = useState({ min: 40, max: 930 });
    const [bedrooms, setBedrooms] = useState('Any');
    const [beds, setBeds] = useState('Any');
    const [bathrooms, setBathrooms] = useState('Any');



    return (
        <div className="filter-modal">
            <div className="filter-modal-header">
                <button className="filter-modal__close-btn" onClick={() => setIsOpen(!isOpen)}>x</button>
                <h2 className="filter-modal__title">Filters</h2>
            </div>
            <div className="filter-modal-content">

                <h3 className="filter-modal__section-title">
                    type of place
                </h3>
                <p>Search rooms, entire homes, or any type of place</p>
                <div className="type-bnb">
                    <div className="bnb-op">
                        <button><h3>Any type</h3></button>
                        <button><h3>Room</h3></button>
                        <button><h3>Entire home</h3></button>
                    </div>
                </div>


                <div className=" roomsbed">
                    <h3 className="filter-modal__section-title">Rooms and beds</h3>
                    <div className="filter-modal__options">
                        <div className="filter-modal__options-row">
                            <h4 className="filter-modal__options-title">Bedrooms</h4>
                            <div className="btn_choose">
                                {['Any', '1', '2', '3', '4', '5', '6', '7', '8+'].map((number, index) => (
                                    <button key={index} className={`modal__button ${number === '2' ? 'filter-modal__button--active' : ''}`}>
                                        {number}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="filter-modal__options-row">
                            <h4 className="filter-modal__options-title">Beds</h4>
                            <div className="btn_choose">
                                {['Any', '1', '2', '3', '4', '5', '6', '7', '8+'].map((number, index) => (
                                    <button key={index} className={`modal__button ${number === 'Any' ? 'filter-modal__button--active' : ''}`}>
                                        {number}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="filter-modal__options-row">
                            <h4 className="filter-modal__options-title">Bathrooms</h4>
                            <div className="btn_choose">
                                {['Any', '1', '2', '3', '4', '5', '6', '7', '8+'].map((number, index) => (
                                    <button key={index} className={`modal__button ${number === 'Any' ? 'filter-modal__button--active' : ''}`}>
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
                        <div className="pro-house">House</div>
                        <div className="pro-Aprt">Apartment</div>
                        <div className="pro-hotel">Hotel</div>
                    </div>
                </div>

            </div>
            <div className="filter-modal-footer">
                <button className="show-btn" >Show places</button>
            </div>
        </div>
    )
}
