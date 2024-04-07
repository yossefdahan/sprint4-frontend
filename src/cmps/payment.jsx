// import DateField from "./DateField";
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from 'react'
import { orderService } from '../services/order.service.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { set } from "date-fns"
import { FeeModal } from "./FeeModal.jsx"
import { PriceModal } from "./PriceModal.jsx"
import DatePicker from 'react-datepicker'
import { GuestSelector } from "./GuestSelector.jsx"
import { useSelector } from "react-redux"
import { orderInProgress } from "../store/order.actions.js"
import { utilService } from "../services/util.service.js"

export function Payment({ stay, filterBy, onSetFilter }) {

    const navigate = useNavigate()
    // const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [order, setOrder] = useState(orderService.emptyOrder())
    const [priceModal, setPriceModal] = useState(false)
    const [feeModal, setFeeModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isSend, setSend] = useState(false)
    const [buttonColor, setButtonColor] = useState('hsl(351, 83%, 50%)');
    const [showGuestDropdown, setShowGuestDropdown] = useState(false)
    const [guestCounts, setGuestCounts] = useState({
        adults: filterBy.adults || 1,
        children: filterBy.children || 0,
        infants: filterBy.infants || 0,
        pets: filterBy.pets || 0
    })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    //    we need // const user = useSelector(storeState => storeState.userModule.loggedinUser)
    // order.stay._id = stay._id
    // order.stay.name = stay.name
    // order.stay.price = stay.price
    // order.hostId = stay.host._id

    const setGuests = () => {
        var guests = []
        if (guestCounts.adults > 0) {
            guests.push(guestCounts.adults + ' ' + 'Adults')
        }
        if (guestCounts.children > 0) {
            guests.push(guestCounts.children + ' ' + 'Children')
        }
        if (guestCounts.infants > 0) {
            guests.push(guestCounts.infants + ' ' + 'Infants')
        }
        if (guestCounts.pets > 0) {
            guests.push(guestCounts.pets + ' ' + 'Pets')
        }
        return guests.join(', ')

    }

    useEffect(() => {
        function handleOutsideClick(event) {
            if (!isOpen) {
                return
            }
            if (
                !event.target.closest('.calendar')
            ) {

                if (isOpen) setIsOpen(false)

            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [isOpen])

    useEffect(() => {

        setOrder(prevOrder => ({
            ...prevOrder,
            stay: {
                _id: stay._id,
                name: stay.name,
                price: stay.price,
            },
            hostId: stay.host._id,
            startDate: filterBy.checkIn,
            endDate: filterBy.checkOut,
            guests: {
                ...guestCounts
            },
        }))
    }, [filterBy, isSend])

    const calculateTotalPrice = () => {
        const days = (filterBy.checkOut - filterBy.checkIn) / (1000 * 3600 * 24)
        const fee = (stay.price / 10) * days
        const finalPrice = days * stay.price
        return finalPrice + fee
    }

    // function handleOrderChange(ev) {
    //     const field = ev.target.name
    //     const value = ev.target.value
    //     setOrder((order) => ({ ...order, [field]: value }))

    // }

    async function sendToFinalOrder(ev) {
        ev.preventDefault()
        const totalPrice = calculateTotalPrice()
        // order.hostId = stay.host.id
        // order.status = 'pending'
        // order.stay = { _id: stay._id, name: stay.name, price: stay.price }
        const finalOrder = {
            ...order,
            totalPrice,
        }

        try {
            await orderInProgress(finalOrder)
            setSend(!isSend)
            setOrder(orderService.emptyOrder())
            // setOrder(savedOrder)

            showSuccessMsg('order saved!')
            navigate(`/payment/${stay._id}`)
        } catch (err) {
            console.log('err cant save order', err)
        }
    }

    function handleChange() {
        const adults = guestCounts.adults
        const children = guestCounts.children
        const infants = guestCounts.infants
        const pets = guestCounts.pets

        onSetFilter.current({
            ...filterBy,
            adults,
            children,
            infants,
            pets
        })
    }

    const handleMouseMove = (event) => {
        const { clientY, target } = event;
        const { top, height } = target.getBoundingClientRect();
        const yRatio = (clientY - top) / height;

        const lightness = 40 + (20 * yRatio);
        setButtonColor(`hsl(351, 83%, ${lightness}%)`);
    };

    // const updateGuestCount = (guestType, newValue) => {
    //     setGuestCounts(prevCounts => ({
    //         ...prevCounts,
    //         [guestType]: newValue
    //     }))
    // }
    const updateGuestCount = (guestType, delta) => {
        setGuestCounts(prevCounts => {

            const newCount = Math.max(0, prevCounts[guestType] + delta)
            switch (guestType) {
                case 'adults':

                    if (prevCounts.adults + prevCounts.children + delta > stay.capacity) return prevCounts
                    break
                case 'children':

                    if (prevCounts.adults + prevCounts.children + delta > stay.capacity) return prevCounts
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
        handleChange()
    }


    return (
        <section className='line-payment'>
            < section className="payment-modal" >
                {(filterBy.checkOut - filterBy.checkIn) >= 1 ? <h1>  $ {stay.price}<span> night</span></h1> : <h1>Add dates for prices</h1>}



                <div className="payment-date-picker">
                    <div>
                        <div className="in">
                            <div className="header-label">CHECK-IN</div>
                            <div className="start-input" onClick={() => setIsOpen(!isOpen)}>{utilService.formatDate(filterBy.checkIn) ? utilService.formatDate(filterBy.checkIn) : "Check in"}</div>
                        </div>
                        <div className="out">
                            <div className="header-label">CHECK-OUT</div>
                            <div className="end-input" onClick={() => setIsOpen(!isOpen)}>{utilService.formatDate(filterBy.checkOut) ? utilService.formatDate(filterBy.checkOut) : "Check out"}</div>
                        </div>
                    </div>


                    <div className="custom-input" onClick={() => setShowGuestDropdown(!showGuestDropdown)}>
                        <div className="header-label">GUESTS</div>
                        <div className="guest-input" >{setGuests().length > 27 ? setGuests().substring(0, 27) + '...' : setGuests()}</div>
                        <div className="dropdown-arrow">{!showGuestDropdown ? <i className="fa-solid fa-chevron-down"></i> : <i class="fa-solid fa-chevron-up"></i>}</div>
                    </div>
                </div>
                <form onSubmit={sendToFinalOrder}>


                    {isOpen && (
                        <div className="date-pick calendar">
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
                                // onClick={() => setIsOpen(true)}
                                onFocus={() => setIsOpen(true)}
                                onBlur={() => setIsOpen(false)}

                            />
                            <div className="datepicker-footer">
                                <button className=" exact-date datepicker-range-button">Exact dates</button>
                                <button className=" date-btn-search datepicker-range-button">+1 day</button>
                                <button className="date-btn-search  datepicker-range-button">+2 days</button>
                            </div>
                        </div>




                    )}

                    <div className="payment-guests">


                        {showGuestDropdown && <div className="payment-guests-count">

                            <GuestSelector guestType="adults" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                            <GuestSelector guestType="children" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                            <GuestSelector guestType="infants" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                            <GuestSelector guestType="pets" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />

                        </div>}
                    </div>
                    {(filterBy.checkOut - filterBy.checkIn) >= 1 ?
                        (<button className="reserve-btn " type="submit" style={{ backgroundColor: buttonColor }}
                            onMouseMove={handleMouseMove} onMouseOut={() => setButtonColor('#ff385c')}>Reserve</button>)
                        :
                        (<button className="reserve-btn " type="submit" style={{ backgroundColor: buttonColor }}
                            onMouseMove={handleMouseMove} onMouseOut={() => setButtonColor('#ff385c')}>Check availability</button>)
                    }
                </form>
                {(filterBy.checkOut - filterBy.checkIn) >= 1 ? <>
                    <h4>You won't be charged yet</h4>

                    <div className="price-modal-btn" onClick={() => setPriceModal(!priceModal)}>${stay.price} x {(filterBy.checkOut - filterBy.checkIn) / (1000 * 3600 * 24)} nights <span className="price">$ {stay.price * (filterBy.checkOut - filterBy.checkIn) / (1000 * 3600 * 24)}</span></div>
                    <div className="fee-modal-btn" onClick={() => setFeeModal(!feeModal)}>Airstay service fee <span className="price">$ {stay.price / 10 * (filterBy.checkOut - filterBy.checkIn) / (1000 * 3600 * 24)}</span></div>
                    <hr />
                    <h3>Total <span>${calculateTotalPrice()}</span></h3>
                    {priceModal && <PriceModal setPriceModal={setPriceModal} priceModal={priceModal} stayDetails={stay} startDate={filterBy.checkIn} endDate={filterBy.checkOut} />}
                    {feeModal && < FeeModal setFeeModal={setFeeModal} feeModal={feeModal} />}
                </> : ''}
            </section >
        </section >)

}