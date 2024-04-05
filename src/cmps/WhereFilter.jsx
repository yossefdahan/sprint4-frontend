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
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const datePickerRef = useRef(null)
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
            ...filterByToEdit,
            country: inputValue,
            checkIn: startDate,
            checkOut: endDate,
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
    return (

        <form onSubmit={handleSubmit} className="search-filter">
            <div className="input-group">
                <input
                    placeholder="Search destination"
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onClick={() => setCountryModal(!countyModal)}
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
                        <h4>Im flexible</h4>
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
                <ul>
                    {suggestions.map(suggestion => (
                        <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}

            <div className="input-group">

                <input
                    type="text"
                    readOnly
                    value={utilService.formatDate(startDate)}
                    placeholder="Start Date"
                    onClick={() => setIsOpen(true)}
                />
            </div>
            {isOpen && (
                // <div className="date-pick">
                <div tabIndex={0} onKeyDown={handleKeyDown}>
                    <div className="datepicker-header">
                        <button className="datepicker-tab">Dates</button>
                        <button className="datepicker-tab">Months</button>
                        <button className="datepicker-tab">Flexible</button>
                    </div>
                    <DatePicker
                        selected={startDate}
                        onChange={(dates) => {
                            const [start, end] = dates
                            setStartDate(start)
                            setEndDate(end)
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        // inline
                        monthsShown={2}
                        open={isOpen}
                        // onClick={() => setIsOpen(true)}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setIsOpen(false)}

                    />
                    <div className="datepicker-footer">
                        <button className="datepicker-range-button">Exact dates</button>
                        <button className="datepicker-range-button">+1 day</button>
                        <button className="datepicker-range-button">+2 days</button>
                    </div>
                </div>

                // </div>
            )}
            <div className="input-group">

                <input
                    type="text"
                    readOnly
                    value={utilService.formatDate(endDate)}
                    placeholder="End Date"
                    onClick={() => setIsOpen(true)}
                />
            </div>




            <div className="input-group">
                <input type="text"
                    placeholder="Add guests"
                    value={formatGuestSummary()}
                    onClick={() => {
                        setIsOpen(false)
                        setShowGuestDropdown(!showGuestDropdown)
                    }}
                    readOnly
                />


            </div>
            {!countyModal ? < button className="search-btn" type="submit"> <i className="fa fa-search"></i></button> : <button className="search-btn" type="submit"> <i className="fa fa-search"></i> Search</button>}
            {showGuestDropdown && <div className="input-group guests-container">

                <GuestSelector guestType="adults" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                <GuestSelector guestType="children" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                <GuestSelector guestType="infants" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                <GuestSelector guestType="pets" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />

            </div>}

        </form>
    )
}