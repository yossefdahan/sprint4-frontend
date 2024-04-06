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

    function setGuests() {
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
        return guests

    }

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
                <h1>${stay.price}<span> night</span></h1>
                <input
                    type="text"
                    readOnly
                    value={utilService.formatDate(filterBy.checkIn)}
                    placeholder="Check in"
                    onClick={() => setIsOpen(!isOpen)}
                />
                <input
                    type="text"
                    readOnly
                    value={utilService.formatDate(filterBy.checkOut)}
                    placeholder="Check out"
                    onClick={() => setIsOpen(true)}
                />
                <form onSubmit={sendToFinalOrder}>


                    {isOpen && (
                        <div className="date-pick">
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

                    {/* <div className="input-group"> */}
                    <input type="text"
                        readOnly
                        value={setGuests()}
                        onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                    />

                    {showGuestDropdown && <div className="input-group guests-container">

                        <GuestSelector guestType="adults" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                        <GuestSelector guestType="children" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                        <GuestSelector guestType="infants" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />
                        <GuestSelector guestType="pets" guestCounts={guestCounts} updateGuestCount={updateGuestCount} />

                    </div>}
                    <button type="submit">Reserve</button>
                    <h4>You won't be charged yet</h4>

                    <div onClick={() => setPriceModal(true)}>${stay.price} x {(filterBy.checkOut - filterBy.checkIn) / (1000 * 3600 * 24)} nights <span> ${stay.price * (filterBy.checkOut - filterBy.checkIn) / (1000 * 3600 * 24)}</span></div>
                    <div onClick={() => setFeeModal(true)}>Airstay service fee {stay.price / 10 * (filterBy.checkOut - filterBy.checkIn) / (1000 * 3600 * 24)}$</div>

                    <h3>Total <span>${calculateTotalPrice()}</span></h3>
                </form>
                {priceModal && <PriceModal setPriceModal={setPriceModal} priceModal={priceModal} stayDetails={stay} startDate={filterBy.checkIn} endDate={filterBy.checkOut} />}
                {feeModal && < FeeModal setFeeModal={setFeeModal} feeModal={feeModal} />}
            </section >
        </section>)

}