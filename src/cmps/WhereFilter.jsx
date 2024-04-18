import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { utilService } from "../services/util.service";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { stayService } from "../services/stay.service";
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css';
import { GuestSelector } from "./GuestSelector";




export function WhereFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [inputValue, setInputValue] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [allCities, setAllCities] = useState([])
    const [allRegions, setAllRegions] = useState([])
    const [allCountries, setAllCountries] = useState([])
    const [countyModal, setCountryModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const datePickerRef = useRef()
    const [showGuestDropdown, setShowGuestDropdown] = useState(false)
    const [guestCounts, setGuestCounts] = useState({
        adults: filterBy.adults || 0,
        children: filterBy.children || 0,
        infants: filterBy.infants || 0,
        pets: filterBy.pets || 0
    })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))
    const navigate = useNavigate()
    const stays = useSelector(storeState => storeState.stayModule.stays)





    useEffect(() => {
        async function loadCountries() {
            const countries = stays.map(stay => stay.loc.country)
            const uniqueCountries = [...new Set(countries)]
            setAllCountries(uniqueCountries)
        }
        loadCountries()
    }, [stays])
    useEffect(() => {
        async function loadCities() {
            const cities = stays.map(stay => stay.loc.city)
            const uniqueCities = [...new Set(cities)]
            setAllCities(uniqueCities)
        }
        loadCities()
    }, [stays])
    useEffect(() => {
        async function loadRegions() {
            const regions = stays.map(stay => stay.loc.region)
            const uniqueRegions = [...new Set(regions)]
            setAllRegions(uniqueRegions)
        }
        loadRegions()
    }, [stays])

    useEffect(() => {
        window.addEventListener('popstate', updateFilter);

        return () => {
            window.removeEventListener('popstate', updateFilter);
        };
    }, []);

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
                !event.target.closest('.in-cal') &&
                !event.target.closest('.guests-section-search') &&
                !event.target.closest('.out-cal') &&
                !event.target.closest('.maps-search') &&
                !event.target.closest('.input-group') &&
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
        const { value } = target;
        setInputValue(value);
        if (!value) {
            setSuggestions([]);
            setFilterByToEdit(prevFilter => ({
                ...prevFilter,
                loc: { ...prevFilter.loc, region: '', country: '', city: '' }
            }));
        } else {
            const filteredCities = allCities.filter(city => city.toLowerCase().includes(value.toLowerCase()));
            const filteredRegions = allRegions.filter(region => region.toLowerCase().includes(value.toLowerCase()));
            const filteredCountries = allCountries.filter(country => country.toLowerCase().includes(value.toLowerCase()));
            setSuggestions([...new Set([...filteredCities, ...filteredRegions, ...filteredCountries])]);

            // setFilterByToEdit(prevFilter => ({
            //     ...prevFilter,
            //     loc: { ...prevFilter.loc, region: value, country: value, city: value }
            // }));
        }
    }


    function handleSuggestionClick(suggestion) {
        setInputValue(suggestion)
        setSuggestions([])
        setIsOpen(true)
    }


    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setFilterByToEdit((prev) => ({
            ...prev,
            checkIn: start,
            checkOut: end
        }));

    }

    function updateFilter() {
        const adults = guestCounts.adults
        const children = guestCounts.children
        const infants = guestCounts.infants
        const pets = guestCounts.pets
        const parts = inputValue.split(',')
        const checkIn = filterByToEdit.checkIn
        const checkOut = filterByToEdit.checkOut
        // const region = parts[0] ? parts[0].trim() : ''
        // const country = parts[1] ? parts[1].trim() : ''
        // const city = parts[2] ? parts[2].trim() : ''
        onSetFilter.current({
            ...filterBy,
            checkIn,
            checkOut,
            city: allCities.find(city => city.toLowerCase() === inputValue.toLowerCase()),
            region: allRegions.find(region => region.toLowerCase() === inputValue.toLowerCase()),
            country: allCountries.find(country => country.toLowerCase() === inputValue.toLowerCase()),
            adults,
            children,
            infants,
            pets
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        updateFilter()
        const parts = inputValue.split(',')
        const region = parts[0] ? parts[0].trim() : ''
        const country = parts[1] ? parts[1].trim() : ''
        const city = parts[2] ? parts[2].trim() : ''

        const queryParams = new URLSearchParams({
            checkIn: filterByToEdit.checkIn,
            checkOut: filterByToEdit.checkOut,
            city: city,
            region: region,
            country: country,
            adults: guestCounts.adults,
            children: guestCounts.children,
            infants: guestCounts.infants,
            pets: guestCounts.pets
        }).toString()

        setIsOpen(false)
        setCountryModal(false)
        setShowGuestDropdown(false)
        navigate(`/?${queryParams}`)
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
    function getRandomRegion() {
        const regions = ["South America", "Greece", "United States", "Italy", "Europe"];
        const randomIndex = Math.floor(Math.random() * regions.length);
        return regions[randomIndex];
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="search-filter">

                <div className="input-group" onClick={() => {
                    setShowGuestDropdown(false)
                    setIsOpen(false)
                    setCountryModal(!countyModal)
                }}>
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
                                setInputValue(getRandomRegion())
                                setIsOpen(true)
                            }} src="https://res.cloudinary.com/dheh8zkmv/image/upload/v1713285036/at39qpsyvldvzsmp2usb.jpg" alt="Im flexible" />
                            <h4>I'm flexible</h4>
                        </div>
                        <div className="img-europe country-filter">
                            <img onClick={() => {
                                setInputValue("Europe")
                                setIsOpen(true)
                            }} src="https://res.cloudinary.com/dheh8zkmv/image/upload/v1713285037/wciko6nwq3da1xycmcn0.webp" alt="Europe" />
                            <h4>Europe</h4>
                        </div>

                        <div className="img-italy country-filter">
                            <img onClick={() => {
                                setInputValue("Italy")
                                setIsOpen(true)
                            }} src="https://res.cloudinary.com/dheh8zkmv/image/upload/v1713285036/wzzoemppuje1purqqulk.webp" alt="Italy" />
                            <h4>Italy</h4>
                        </div>
                        <div className="img-usa country-filter">
                            <img onClick={() => {
                                setInputValue("United States")
                                setIsOpen(true)
                            }} src="https://res.cloudinary.com/dheh8zkmv/image/upload/v1713285036/lhzijaiju4xrxp7j2xoq.webp" alt="United States" />
                            <h4>United States</h4>
                        </div>
                        <div className="img-greece country-filter">
                            <img onClick={() => {
                                setInputValue("Greece")
                                setIsOpen(true)
                            }} src="https://res.cloudinary.com/dheh8zkmv/image/upload/v1713285036/wtoiztwdkxz4lh68w5cm.webp" alt="Greece" />
                            <h4>Greece</h4>
                        </div>
                        <div className="img-south country-filter">
                            <img onClick={() => {
                                setInputValue("South America")
                                setIsOpen(true)
                            }} src="https://res.cloudinary.com/dheh8zkmv/image/upload/v1713285036/vloxob5h0ndj3gqe6oum.webp" alt="South America" />
                            <h4>South America</h4>
                        </div>
                    </div>
                }

                {inputValue && suggestions.length > 0 && (
                    <ul className="destination-txt-input" >

                        {suggestions.slice(0, 2).map(suggestion => (
                            <li key={suggestion} className="suggestion" onClick={() => handleSuggestionClick(suggestion)}>
                                <img src="https://res.cloudinary.com/dheh8zkmv/image/upload/v1713446408/bpjzyojnoloxmusbixva.svg" alt="" />
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
                                selected={filterByToEdit.checkIn}
                                onChange={handleDateChange}
                                startDate={filterByToEdit.checkIn}
                                endDate={filterByToEdit.checkOut}
                                selectsRange
                                monthsShown={2}
                                open={isOpen}
                                onFocus={() => setIsOpen(true)}
                                onBlur={() => setIsOpen(false)}
                                dayClassName={(date) => date < new Date() ? 'past-date' : undefined}
                                minDate={new Date()}

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
                        <div className="in-cal" onClick={() => {
                            setShowGuestDropdown(false)
                            setIsOpen(!isOpen)
                            setCountryModal(false)
                        }}>
                            <div className="header-label-cal">Check in</div>
                            <div className="start-input-cal" >{utilService.formatDate(filterByToEdit.checkIn) ? utilService.formatDate(filterByToEdit.checkIn) : "Add dates"}</div>
                        </div>
                        <div className="out-cal" onClick={() => {
                            setShowGuestDropdown(false)
                            setIsOpen(!isOpen)
                            setCountryModal(false)
                        }}>
                            <div className="header-label-cal">Check out</div>
                            <div className="end-input-cal" >{utilService.formatDate(filterByToEdit.checkOut) ? utilService.formatDate(filterByToEdit.checkOut) : "Add dates"}</div>
                        </div>
                    </div>
                </div>

                {/* <div className=" guests-section-search input-group" onClick={() => {
                    setIsOpen(false)
                    setShowGuestDropdown(!showGuestDropdown)
                }}> */}

                <div className="guests-section-search" onClick={() => {
                    setShowGuestDropdown(!showGuestDropdown)
                    setIsOpen(false)
                    setCountryModal(false)
                }}>

                    <div className="header-label-gues">Who</div>
                    <div className="search-btn-guests" >{formatGuestSummary() ? formatGuestSummary().substring(0, 13) + '...' : 'Add guests'}</div>
                </div>
                {!countyModal && !showGuestDropdown && !isOpen ? < button style={{ left: "92%" }} className="search-btn" type="submit"> <i className="fa fa-search"></i></button> : <button style={{ left: "85%" }} className="search-btn" type="submit"> <i className="fa fa-search"></i><span>Search</span> </button>}
                {/* </div> */}
                {showGuestDropdown && <div className="input-group guests-container">

                    <GuestSelector guestType="adults" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                    <GuestSelector guestType="children" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                    <GuestSelector guestType="infants" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                    <GuestSelector guestType="pets" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />

                </div>}

            </form >

        </>
    )
}