import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { stayService } from "../services/stay.service.local";
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css';
import { GuestSelector } from "./GuestSelector";




export function WhereFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [inputValue, setInputValue] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [allCountries, setAllCountries] = useState([])
    const [countyModal, setCountryModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const datePickerRef = useRef()
    const [showGuestDropdown, setShowGuestDropdown] = useState(false)
    const [guestCounts, setGuestCounts] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0
    })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        async function loadCountries() {
            const countries = await stayService.getCountries()
            setAllCountries(countries)
        }
        loadCountries()
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setIsOpen(true)
        }
    }

    useEffectUpdate(() => {

    }, [filterByToEdit, inputValue])


    useEffect(() => {
        function handleOutsideClick(event) {
            if (isOpen && datePickerRef.current && datePickerRef.current.contains(event.target)) {
                return;
            }
            if (
                // !event.target.closest('.datePickerRef') &&
                !event.target.closest('.maps-search') &&
                !event.target.closest('.guest-selector')
            ) {
                setCountryModal(false);
                setShowGuestDropdown(false);
                if (isOpen) setIsOpen(false);
                // setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [datePickerRef, isOpen]);


    function handleChange({ target }) {
        const { value } = target
        setInputValue(value)
        if (!value) {
            setSuggestions([])
        } else {
            const filteredCountries = allCountries.filter(country =>
                country.toLowerCase().startsWith(value.toLowerCase())
            )
            setSuggestions(filteredCountries)
        }
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            loc: { ...prevFilter.loc, country: value }
        }))
    }

    function handleSuggestionClick(suggestion) {
        setInputValue(suggestion)
        setSuggestions([])
        setIsOpen(true)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const adults = guestCounts.adults
        const children = guestCounts.children
        const infants = guestCounts.infants
        const pets = guestCounts.pets
        onSetFilter.current({
            ...filterBy,
            country: inputValue,
            adults,
            children,
            infants,
            pets
            // guests: guestCounts
        })
        setIsOpen(false)
        setCountryModal(false)
        setShowGuestDropdown(false)
    }

    // const updateGuestCount = (guestType, delta) => {
    //     setGuestCounts(prevCounts => ({
    //         ...prevCounts,
    //         [guestType]: Math.max(0, prevCounts[guestType] + delta)
    //     }))
    // }


    const updateGuestCount = (guestType, delta) => {
        setGuestCounts(prevCounts => {

            const newCount = Math.max(0, prevCounts[guestType] + delta)
            switch (guestType) {
                case 'adults':

                    if (prevCounts.adults + prevCounts.children + delta > 16) return prevCounts
                    break
                case 'children':

                    if (prevCounts.adults + prevCounts.children + delta > 16) return prevCounts
                    break
                case 'infants':

                    if (newCount > 5) return prevCounts
                    break
                case 'pets':

                    if (newCount > 5) return prevCounts
                    break
                default:
                    break
            }
            return { ...prevCounts, [guestType]: newCount }
        })
    }


    const formatGuestSummary = () => {
        let summary = []
        if (guestCounts.adults > 0) {
            summary.push(guestCounts.adults + (guestCounts.adults === 1 ? ' Adult' : ' Adults'))
        }
        if (guestCounts.children > 0) {
            summary.push(guestCounts.children + (guestCounts.children === 1 ? ' Child' : ' Children'))
        }
        if (guestCounts.infants > 0) {
            summary.push(guestCounts.infants + (guestCounts.infants === 1 ? ' Infant' : ' Infants'))
        }
        if (guestCounts.pets > 0) {
            summary.push(guestCounts.pets + (guestCounts.pets === 1 ? ' Pet' : ' Pets'))
        }
        return summary.join(', ')
    }
    // const { country, city } = filterBy
    // const { guests } = filterBy
    // const { dates } = filterBy
    // const searchParams = new URLSearchParams(window.location.search)
    // function backHome() {
    //     window.location.href = `/${searchParams}`
    // }

    return (
        <>
            <form onSubmit={handleSubmit} className="search-filter">

                <div className="input-group" onClick={() => setCountryModal(!countyModal)}>
                    {/* <p>Where</p> */}
                    <div className="search-header-destination">Where</div>
                    <input className="search-btn-destination"
                        placeholder="Search destination"
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                    />

                </div>
                {countyModal && !inputValue &&
                    <div className="maps-search" >

                        <h5>Search by region</h5>

                        <div className="img-flexible country-filter">
                            <img onClick={() => {
                                setInputValue("mexico")
                                setIsOpen(true)
                            }} src="src\assets\img\destination\asset 0.jpeg" alt="Im flexible" />
                            <h4>I'm flexible</h4>
                        </div>
                        <div className="img-europe country-filter">
                            <img onClick={() => {
                                setInputValue("portugal")
                                setIsOpen(true)
                            }} src="src\assets\img\destination\asset 2.webp" alt="Europe" />
                            <h4>Europe</h4>
                        </div>

                        <div className="img-italy country-filter">
                            <img onClick={() => {
                                setInputValue("portugal")
                                setIsOpen(true)
                            }} src="src\assets\img\destination\asset 3.webp" alt="Italy" />
                            <h4>Italy</h4>
                        </div>
                        <div className="img-usa country-filter">
                            <img onClick={() => {
                                setInputValue("canada")
                                setIsOpen(true)
                            }} src="src\assets\img\destination\asset 4.webp" alt="United States" />
                            <h4>United States</h4>
                        </div>
                        <div className="img-greece country-filter">
                            <img onClick={() => {
                                setInputValue("usa")
                                setIsOpen(true)
                            }} src="src\assets\img\destination\asset 5.webp" alt="Greece" />
                            <h4>Greece</h4>
                        </div>
                        <div className="img-south country-filter">
                            <img onClick={() => {
                                setInputValue("portugal")
                                setIsOpen(true)
                            }} src="src\assets\img\destination\asset 1.webp" alt="South America" />
                            <h4>South America</h4>
                        </div>
                    </div>
                }

                {inputValue && suggestions.length > 0 && (
                    <ul className="destination-txt-input" >

                        {suggestions.map(suggestion => (
                            <li key={suggestion} className="suggestion" onClick={() => handleSuggestionClick(suggestion)}>
                                <i class="fa-solid fa-location-dot"></i>
                                <div>{suggestion}</div>
                            </li>

                        ))}
                    </ul>
                )}

                {/* <div className="input-group " onClick={() => setIsOpen(true)}>

                    <input className="search-btn-dates"
                        type="text"
                        readOnly
                        value={utilService.formatDate(filterBy.checkIn)}
                        placeholder="Check in"
                    />
                </div> */}
                {isOpen && (
                    <div ref={datePickerRef} className="date-pick" onClick={(event) => event.stopPropagation()}>
                        <div tabIndex={0} onKeyDown={handleKeyDown}>
                            <div className="datepicker-header">
                                <button className="dates datepicker-tab">Dates</button>
                                <button className="datepicker-tab">Months</button>
                                <button className="datepicker-tab">Flexible</button>
                            </div>

                            <DatePicker
                                selected={filterBy.checkIn}
                                onChange={(dates) => {
                                    const [start, end] = dates
                                    onSetFilter.current({
                                        ...filterBy,
                                        checkIn: start,
                                        checkOut: end
                                    })
                                }}
                                startDate={filterBy.checkIn}
                                endDate={filterBy.checkOut}
                                selectsRange
                                // inline
                                monthsShown={2}
                                open={isOpen}
                                onFocus={() => setIsOpen(true)}
                                onBlur={() => setIsOpen(false)}
                                dayClassName={(date) => date < new Date() ? 'past-date' : undefined}


                            />
                        </div>
                        <div className="datepicker-footer">
                            <button className=" exact-date datepicker-range-button">Exact dates</button>
                            <button className=" date-btn-search datepicker-range-button">+1 day</button>
                            <button className="date-btn-search  datepicker-range-button">+2 days</button>
                        </div>
                    </div>




                )}
                {/* <div className="input-group " onClick={() => setIsOpen(true)}>
                    <input className="search-btn-dates"
                        type="text"
                        readOnly
                        value={utilService.formatDate(filterBy.checkOut)}
                        placeholder="Check out"
                    />
                </div> */}

                <div className="pick-cal">
                    <div>
                        <div className="in-cal">
                            <div className="header-label-cal">Check in</div>
                            <div className="start-input-cal" onClick={() => setIsOpen(!isOpen)}>{utilService.formatDate(filterBy.checkIn) ? utilService.formatDate(filterBy.checkIn) : "Add dates"}</div>
                        </div>
                        <div className="out-cal">
                            <div className="header-label-cal">Check out</div>
                            <div className="end-input-cal" onClick={() => setIsOpen(!isOpen)}>{utilService.formatDate(filterBy.checkOut) ? utilService.formatDate(filterBy.checkOut) : "Add dates"}</div>
                        </div>
                    </div>
                </div>

                {/* <div className=" guests-section-search input-group" onClick={() => {
                    setIsOpen(false)
                    setShowGuestDropdown(!showGuestDropdown)
                }}> */}

                <div className="guests-section-search" onClick={() => {
                    setIsOpen(false)
                    setShowGuestDropdown(!showGuestDropdown)
                }}>

                    <div className="header-label-gues">Who</div>
                    <div className="search-btn-guests" >{formatGuestSummary() ? formatGuestSummary().substring(0, 15) + '...' : 'Add guests'}</div>
                </div>
                {!countyModal ? < button className="search-btn" type="submit"> <i className="fa fa-search"></i></button> : <button className="search-btn" type="submit"> <i className="fa fa-search"></i><span>Search</span> </button>}
                {/* </div> */}
                {showGuestDropdown && <div className="input-group guests-container">

                    <GuestSelector guestType="adults" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                    <GuestSelector guestType="children" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                    <GuestSelector guestType="infants" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                    <GuestSelector guestType="pets" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />

                </div>}

            </form>
            <hr className="hr-line" />
        </>
    )
}