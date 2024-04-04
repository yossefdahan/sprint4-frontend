// import DateField from "./DateField";
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { orderService } from '../services/order.service.js'

export function Payment({ stay }) {
    const [order, setOrder] = useState(orderService.emptyOrder())
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

    // useEffect(() => {

    // }, [order])
    // order.buyer

    return < section className="payment-modal" >
        <h1>hello
            from payment
        </h1>
        <form onSubmit={handleOrderChange}>


            <select name="capacity" value={order.guests}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </form>
        <button><Link to={`/payment/${stay._id}`}>reserve</Link></button>
    </section >

}