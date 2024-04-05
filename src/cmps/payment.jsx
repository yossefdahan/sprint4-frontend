// import DateField from "./DateField";
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { orderService } from '../services/order.service.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { set } from "date-fns"
import { FeeModal } from "./FeeModal.jsx"
import { PriceModal } from "./PriceModal.jsx"

export function Payment({ stay }) {
    const [order, setOrder] = useState(orderService.emptyOrder())
    const [priceModal, setPriceModal] = useState(false)
    const [feeModal, setFeeModal] = useState(false)
    const navigate = useNavigate()

    //    we need // const user = useSelector(storeState => storeState.userModule.loggedinUser)
    order.stay._id = stay._id
    order.stay.name = stay.name
    order.stay.price = stay.price
    order.hostId = stay.host._id

    function handleOrderChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setOrder((order) => ({ ...order, [field]: value }))

    }
    // sendToFinalOrder(order)
    async function sendToFinalOrder(ev, order) {
        ev.preventDefault()
        try {
            const savedOrder = await orderService.OrderInProggres(order)
            setOrder(savedOrder)

            setOrder(orderService.emptyOrder())
            showSuccessMsg('order saved!')
            navigate(`/payment/${stay._id}`)
        } catch (err) {
            console.log('err cant save order', err)
        }
    }




    return < section className="payment-modal" >
        <h1>${stay.price}<span> night</span></h1>

        <form onSubmit={sendToFinalOrder}>


            <select name="capacity" value={order.guests.adults}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>
            <button>Reserve</button>
            <h4>You won't be charged yet</h4>

            <a onClick={() => setPriceModal(!priceModal)}>{`$${stay.price} night`}</a>
            <a onClick={() => setFeeModal(!feeModal)}>Airbnb service fee <span>{`$100 night`}</span></a>

            <h3>Total <span>${ }</span></h3>
        </form>
        {priceModal && <PriceModal setPriceModal={setPriceModal} priceModal={priceModal} />}
        {feeModal && < FeeModal setFeeModal={setFeeModal} feeModal={feeModal} />}
    </section >

}