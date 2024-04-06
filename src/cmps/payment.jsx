// import DateField from "./DateField";
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
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

export function Payment({ stay, filterBy }) {
    const navigate = useNavigate()
    // const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [order, setOrder] = useState(orderService.emptyOrder())
    const [priceModal, setPriceModal] = useState(false)
    const [feeModal, setFeeModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isSend, setSend] = useState(false)

    const [startDate, setStartDate] = useState(filterBy.checkIn ? new Date(filterBy.checkIn) : new Date())
    const [endDate, setEndDate] = useState(filterBy.checkOut ? new Date(filterBy.checkOut) : new Date())
    const [guestCounts, setGuestCounts] = useState({
        adults: filterBy.adults || 1,
        children: filterBy.children || 0,
        infants: filterBy.infants || 0,
        pets: filterBy.pets || 0
    })

    //    we need // const user = useSelector(storeState => storeState.userModule.loggedinUser)
    // order.stay._id = stay._id
    // order.stay.name = stay.name
    // order.stay.price = stay.price
    // order.hostId = stay.host._id

    useEffect(() => {
        const { checkIn, checkOut, guests } = filterBy.dates || {}
        // setStartDate(checkIn ? new Date(checkIn) : new Date())
        // setEndDate(checkOut ? new Date(checkOut) : new Date())
        setGuestCounts({
            adults: guests && guests.adults ? guests.adults : 1,
            children: guests && guests.children ? guests.children : 0,
            infants: guests && guests.infants ? guests.infants : 0,
            pets: guests && guests.pets ? guests.pets : 0,
        })
    }, [filterBy, stay])

    useEffect(() => {

        setOrder(prevOrder => ({
            ...prevOrder,
            stay: {
                _id: stay._id,
                name: stay.name,
                price: stay.price,
            },
            hostId: stay.host._id,
            startDate: startDate,
            endDate: endDate,
            guests: {
                ...guestCounts
            },
        }))
    }, [filterBy, isSend])

    const calculateTotalPrice = () => {
        const days = (endDate - startDate) / (1000 * 3600 * 24)
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

    const updateGuestCount = (guestType, newValue) => {
        setGuestCounts(prevCounts => ({
            ...prevCounts,
            [guestType]: newValue
        }))
    }


    return (
        <section className='line-payment'>
            < section className="payment-modal" >
                <h1>${stay.price}<span> night</span></h1>
                <input
                    type="text"
                    readOnly
                    value={utilService.formatDate(startDate)}
                    placeholder="Check in"
                    onClick={() => setIsOpen(!isOpen)}
                />
                <input
                    type="text"
                    readOnly
                    value={utilService.formatDate(endDate)}
                    placeholder="Check out"
                    onClick={() => setIsOpen(true)}
                />
                <form onSubmit={sendToFinalOrder}>
                    {isOpen && (
                        <div className="date-pick">
                            {/* <div className="datepicker-header">
                            <button className="dates datepicker-tab">Dates</button>
                            <button className="datepicker-tab">Months</button>
                            <button className="datepicker-tab">Flexible</button>
                        </div> */}

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
                                <button className=" exact-date datepicker-range-button">Exact dates</button>
                                <button className=" date-btn-search datepicker-range-button">+1 day</button>
                                <button className="date-btn-search  datepicker-range-button">+2 days</button>
                            </div>
                        </div>




                    )}

                    {/* <div className="input-group"> */}
                    <input type="text" readOnly value={`${Object.values(guestCounts).reduce((acc, num) => acc + num, 0)} guests`} />

                    {/* <div className="input-group guests-container"> */}

                    {/* <GuestSelector guestType="adults" guestCount={guestCounts.adults} updateGuestCount={(newValue) => updateGuestCount('adults', newValue)} />
                <GuestSelector guestType="children" guestCount={guestCounts.children} updateGuestCount={(newValue) => updateGuestCount('children', newValue)} />
                <GuestSelector guestType="infants" guestCount={guestCounts.infants} updateGuestCount={(newValue) => updateGuestCount('infants', newValue)} />
                <GuestSelector guestType="pets" guestCount={guestCounts.pets} updateGuestCount={(newValue) => updateGuestCount('pets', newValue)} /> */}


                    <button type="submit">Reserve</button>
                    <h4>You won't be charged yet</h4>

                    <div onClick={() => setPriceModal(true)}>${stay.price} x {(endDate - startDate) / (1000 * 3600 * 24)} nights <span> ${stay.price * (endDate - startDate) / (1000 * 3600 * 24)}</span></div>
                    <div onClick={() => setFeeModal(true)}>Airstay service fee {stay.price / 10 * (endDate - startDate) / (1000 * 3600 * 24)}$</div>

                    <h3>Total <span>${calculateTotalPrice()}</span></h3>
                </form>
                {priceModal && <PriceModal setPriceModal={setPriceModal} priceModal={priceModal} stayDetails={stay} startDate={startDate} endDate={endDate} />}
                {feeModal && < FeeModal setFeeModal={setFeeModal} feeModal={feeModal} />}
            </section >
        </section>)

}