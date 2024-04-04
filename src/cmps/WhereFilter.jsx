import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { stayService } from "../services/stay.service.local";



export function WhereFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [inputValue, setInputValue] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [allCountries, setAllCountries] = useState([])
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        async function loadCountries() {
            const countries = await stayService.getCountries()
            setAllCountries(countries)
        }
        loadCountries()
    }, [])



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
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            loc: { ...prevFilter.loc, country: value }
        }))
    }

    function handleSuggestionClick(suggestion) {
        setInputValue(suggestion)
        setSuggestions([])

        onSetFilter.current({ ...filterByToEdit, loc: { country: suggestion } })
    }
    return (<section className="where-filter-container">
        <h5>Where</h5>
        <input
            placeholder="Search destination"
            type="text"
            value={inputValue}
            onChange={handleChange}
        />
        {inputValue && suggestions.length > 0 && (
            <ul>
                {suggestions.map(suggestion => (
                    <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion}
                    </li>
                ))}
            </ul>
        )}
    </section>)
}