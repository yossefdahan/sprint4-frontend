import { useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from "react"
// import { useParams } from 'react-router-dom'
import { userService } from '../services/user.service.js'
import { setFilterBy } from '../store/stay.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.js'
import { MainDetails } from '../cmps/MainDetails.jsx'
import { GoogleMap } from '../cmps/GoogleMap.jsx'
import { Reviews } from '../cmps/Reviews.jsx'
import { Payment } from '../cmps/payment.jsx'
import { set } from 'date-fns'
import { utilService } from '../services/util.service.js'
import { orderService } from '../services/order.service.js'



export function StayDetails() {
    const { stayId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [currentFilter, setCurrentFilter] = useState({
        checkIn: searchParams.get('checkIn') ? new Date(parseInt(searchParams.get('checkIn'))) : filterBy.checkIn,
        checkOut: searchParams.get('checkOut') ? new Date(parseInt(searchParams.get('checkOut'))) : filterBy.checkOut,
        adults: parseInt(searchParams.get('adults')) || filterBy.adults || 1,
        children: parseInt(searchParams.get('children')) || filterBy.children,
        pets: parseInt(searchParams.get('pets')) || filterBy.pets,
        infants: parseInt(searchParams.get('infants')) || filterBy.infants
    })
    const [stay, setStay] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const users = useSelector(storeState => storeState.userModule.users)
    const imgHeader = useRef()
    const [showHeader, setShowHeader] = useState(true)
    const [showReserveHeader, setShowReserveHeader] = useState(true)
    const [triggerReservation, setTriggerReservation] = useState(false);
    const [triggerCalender, setTriggerCalender] = useState(false);



    const handleReserveClick = () => {
        setTriggerReservation(true)
    }
    const handleCalenderClick = () => {
        setTriggerCalender(true)
    }

    useEffect(() => {
        setSearchParams({
            ...currentFilter,
            checkIn: currentFilter.checkIn ? currentFilter.checkIn.getTime() : '',
            checkOut: currentFilter.checkOut ? currentFilter.checkOut.getTime() : ''
        }, { replace: true })
        loadStay()
    }, [stayId, currentFilter])


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            setShowHeader(entry.isIntersecting);
        }, { threshold: 0.1 });

        const div = imgHeader.current;
        if (div) {
            observer.observe(div);
        }

        return () => observer.disconnect();
    }, [showHeader, showReserveHeader]);



    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {

            navigate('/')
        }
    }

    if (!stay) return <div className='loader'></div>
    const { stars, averageRating } = utilService.getStarsWithRating(stay)
    return (
        <div className='details-layout  '>
            {!showHeader && <div className='details-header-observer'>
                <ul className='links-head'>
                    <li> <a href="#photos">Photos</a></li>
                    <li><a href="#amenities">Amenities</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                    <li><a href="#location">Location</a></li>
                </ul>

                {!showReserveHeader && <div className='res-head'>
                    <p className='price-head'>$ {stay.price}<span> night</span></p>
                    <p className='star-head'>★ {averageRating} ~ <span>{stay.reviews.length} reviews</span></p>
                    {currentFilter.checkOut ?
                        (<button onClick={handleReserveClick}>Reserve</button>)
                        :
                        (<button onClick={handleCalenderClick}>Check availability</button>)
                    }
                </div>}

            </div>}
            <div className='main-header-details flex space-between '>
                <h1 className='stay-name-details '>{stay.name}</h1>
                <div className='header-buttons-section'>
                    <button> <i className="fa-solid fa-arrow-up-from-bracket"></i> <span className='share-btn'> Share</span>  </button>
                    <button> ❤️ <span>Saved</span> </button>
                </div>
            </div>
            <div className='gallery' ref={imgHeader}>
                {stay.imgUrls.map((img) =>
                    <img id='photos' src={img} alt="img of the photo" key={img} onClick={() => setIsOpen(!isOpen)} />
                )
                }
            </div>
            {isOpen ? (
                <div className='gallery-modal'>
                    <span className="close-btn" onClick={() => setIsOpen(false)}>{'>'}</span>
                    <div className='img-gallery-modal' >
                        {stay.imgUrls.map((img) =>
                            <img src={img} alt="Stay view" key={img} />
                        )}
                    </div>
                </div>
            ) : ''}

            <div className='main-details' id='amenities' >
                <MainDetails stay={stay} filterBy={currentFilter} onSetFilter={setCurrentFilter} />
                <Payment triggerCalender={triggerCalender} setTriggerCalender={setTriggerCalender} triggerReservation={triggerReservation} setTriggerReservation={setTriggerReservation} stay={stay} filterBy={currentFilter} onSetFilter={setCurrentFilter} showReserveHeader={showReserveHeader} setShowReserveHeader={setShowReserveHeader} />

            </div>

            <div className="details-reviews" id='reviews'>
                <Reviews stay={stay} reviews={stay.reviews} />
            </div>
            <div className="google-map-details" id='location'>
                <GoogleMap stay={stay} />
            </div>
            {/* <div className='footer-container-details full'>
                <div className='footer-details'>
                    <section className='footer-section'>
                        <h2 className="location-map-details">Airbnb</h2>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Policies</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </section>
                    <section className='footer-section'>
                        <h2 className="location-map-details">Hosting</h2>
                        <ul>
                            <li><a href="#">Why Host</a></li>
                            <li><a href="#">Hospitality</a></li>
                            <li><a href="#">Responsible Hosting</a></li>
                            <li><a href="#">Community Center</a></li>
                        </ul>
                    </section>
                    <section className='footer-section'>
                        <h2 className="location-map-details">Support</h2>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Cancellation Options</a></li>
                            <li><a href="#">Neighborhood Support</a></li>
                        </ul>
                    </section>
                </div>
            </div> */}
            {/* <div className="app-footer full">
                <div className="footer-content">

                    <div className="footer-main-content">
                        © 2024 Airstay, Inc. · <span> Terms </span> · <span> Sitemap </span> · <span> Privacy </span> · <span> Your Privacy Choices </span>
                        <img className="privacy-icon" src="src/assets/img/small-icons/asset 99.svg" alt="" />
                    </div>
                    <div className="second-section-footer">
                        <p className="lan-footer "><i className="fa-solid fa-globe"></i><span> English (US)</span> </p>
                    </div>
                </div>
            </div> */}


        </div >
    )


}


