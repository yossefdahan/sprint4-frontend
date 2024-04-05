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

export function Payment({ stay, filterBy }) {
    const navigate = useNavigate()
    // const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [order, setOrder] = useState(orderService.emptyOrder())
    const [priceModal, setPriceModal] = useState(false)
    const [feeModal, setFeeModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const [startDate, setStartDate] = useState(filterBy.dates.checkIn ? new Date(filterBy.dates.checkIn) : new Date())
    const [endDate, setEndDate] = useState(filterBy.dates.checkOut ? new Date(filterBy.dates.checkOut) : new Date())
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
    console.log(filterBy);
    console.log(guestCounts.adults);

    useEffect(() => {
        const { checkIn, checkOut, guests } = filterBy.dates || {}
        setStartDate(checkIn ? new Date(checkIn) : new Date())
        setEndDate(checkOut ? new Date(checkOut) : new Date())
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
    }, [startDate, endDate, guestCounts])

    const calculateTotalPrice = () => {
        const days = (endDate - startDate) / (1000 * 3600 * 24)
        return days * stay.price
    }

    // function handleOrderChange(ev) {
    //     const field = ev.target.name
    //     const value = ev.target.value
    //     setOrder((order) => ({ ...order, [field]: value }))

    // }

    async function sendToFinalOrder(ev, order) {
        ev.preventDefault()
        const totalPrice = calculateTotalPrice()
        const finalOrder = {
            ...order,
            totalPrice,
        }

        try {
            const savedOrder = await orderService.OrderInProggres(finalOrder)
            setOrder(savedOrder)

            setOrder(orderService.emptyOrder())
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
        < section className="payment-modal" >
            <h1>${stay.price}<span> night</span></h1>


            <form onSubmit={sendToFinalOrder}>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    startDate={startDate}
                    endDate={endDate}
                    selectsStart

                />
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    startDate={startDate}
                    endDate={endDate}
                    selectsEnd

                />

                {/* <div className="input-group"> */}
                <input type="text" readOnly value={`${Object.values(guestCounts).reduce((acc, num) => acc + num, 0)} guests`} />

                {/* <div className="input-group guests-container"> */}

                {/* <GuestSelector guestType="adults" guestCount={guestCounts.adults} updateGuestCount={(newValue) => updateGuestCount('adults', newValue)} />
                <GuestSelector guestType="children" guestCount={guestCounts.children} updateGuestCount={(newValue) => updateGuestCount('children', newValue)} />
                <GuestSelector guestType="infants" guestCount={guestCounts.infants} updateGuestCount={(newValue) => updateGuestCount('infants', newValue)} />
                <GuestSelector guestType="pets" guestCount={guestCounts.pets} updateGuestCount={(newValue) => updateGuestCount('pets', newValue)} /> */}


                <button type="submit">Reserve</button>
                <h4>You won't be charged yet</h4>

                <a onClick={() => setPriceModal(true)}>${stay.price} x {guestCounts.adults + guestCounts.children} guests</a>
                <a onClick={() => setFeeModal(true)}>Airstay service fee $100</a>

                <h3>Total <span>${calculateTotalPrice().toFixed(2)}</span></h3>
            </form>
            {priceModal && <PriceModal setPriceModal={setPriceModal} priceModal={priceModal} />}
            {feeModal && < FeeModal setFeeModal={setFeeModal} feeModal={feeModal} />}
        </section >)

}