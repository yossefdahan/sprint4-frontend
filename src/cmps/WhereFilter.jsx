import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { stayService } from "../services/stay.service.local";
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css';



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
        onSetFilter.current({ ...filterByToEdit, loc: { country: inputValue } })
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
        // setFilterByToEdit(prevFilter => ({
        //     ...prevFilter,
        //     loc: { ...prevFilter.loc, country: value }
        // }))
    }

    function handleSuggestionClick(suggestion) {
        setInputValue(suggestion)
        setSuggestions([])

        onSetFilter.current({ ...filterByToEdit, loc: { country: suggestion } })
        setIsOpen(true)
    }

    function handleSubmit(event) {
        event.preventDefault()

        const updatedFilter = {
            ...filterByToEdit,
            loc: { country: inputValue },
            startDate,
            endDate
        }

        onSetFilter.current(updatedFilter)


        setIsOpen(false)
        setCountryModal(false)
    }

    return (<section className="where-filter-container" >
        <h5>Where</h5>
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Search destination"
                type="text"
                value={inputValue}
                onChange={handleChange}
                onClick={() => setCountryModal(!countyModal)}
            />
            {countyModal && !inputValue &&
                <div style={{ width: "100px", display: "flex" }} >
                    <img onClick={() => {
                        setInputValue("mexico")
                        setIsOpen(true)
                    }} src="src\assets\img\destination\asset 0.jpeg" alt="Im flexible" />
                    <h4>Im flexible</h4>

                    <img onClick={() => {
                        setInputValue("portugal")
                        setIsOpen(true)
                    }} src="src\assets\img\destination\asset 2.webp" alt="Europe" />
                    <h4>Europe</h4>

                    <img onClick={() => {
                        setInputValue("portugal")
                        setIsOpen(true)
                    }} src="src\assets\img\destination\asset 3.webp" alt="Italy" />
                    <h4>Italy</h4>

                    <img onClick={() => {
                        setInputValue("canada")
                        setIsOpen(true)
                    }} src="src\assets\img\destination\asset 4.webp" alt="United States" />
                    <h4>United States</h4>

                    <img onClick={() => {
                        setInputValue("usa")
                        setIsOpen(true)
                    }} src="src\assets\img\destination\asset 5.webp" alt="Greece" />
                    <h4>Greece</h4>

                    <img onClick={() => {
                        setInputValue("portugal")
                        setIsOpen(true)
                    }} src="src\assets\img\destination\asset 1.webp" alt="South America" />
                    <h4>South America</h4>

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
            {isOpen && (
                <div tabIndex={0} onKeyDown={handleKeyDown}>
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
                        inline
                        monthsShown={2}
                    />
                </div>
            )}
            {!countyModal ? < button type="submit">🔍</button> : <button type="submit">🔍 Search</button>}
        </form>
    </section >)
}