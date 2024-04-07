import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders, updateOrder } from '../store/order.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { MyChart } from '../cmps/MyChart.jsx'

import { NavLink } from 'react-router-dom'

export function DashBoard() {

    const orders = useSelector(storeState => storeState.orderModule.orders)
    const [orderUpdateTrigger, setOrderUpdateTrigger] = useState(false)

    useEffect(() => {
        loadOrders()
    }, [orders])


    async function onAproveOrder(order) {
        try {
            order.status = 'approved'
            const savedOrder = await updateOrder(order)
            showSuccessMsg(`order updated : ${savedOrder.status}`)
            setOrderUpdateTrigger(!orderUpdateTrigger)
        } catch (err) {
            showErrorMsg('Cannot update order')
        }
    }
    async function onRejectOrder(order) {
        try {
            order.status = 'rejected'
            const savedOrder = await updateOrder(order)
            showSuccessMsg(`order updated : ${savedOrder.status}`)
            setOrderUpdateTrigger(!orderUpdateTrigger)


        } catch (err) {
            showErrorMsg('Cannot update order')
        }
    }


    if (!orders) return <div>loading.....</div>

    return (
        <div className="trips-page">
            <div className="navigation-links">
                <NavLink to="/user/trips" activeClassName="active">Trips</NavLink>
                <NavLink to="/user/dashboard" activeClassName="active">Dashboard</NavLink>
            </div>
            <section>
                <h1></h1>
            </section>
            <div className="trips-container">

                <h1>DashBoard</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Buyer Full Name</th>
                            <th>Total Price</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Adults</th>
                            <th>Kids</th>
                            <th>Pets</th>
                            <th>Infants</th>
                            <th>Stay Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.buyer._id}>
                                <td>{order.buyer.fullname}</td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td>{order.startDate}</td>
                                <td>{order.endDate}</td>
                                <td>{order.guests.adults}</td>
                                <td>{order.guests.kids}</td>
                                <td>{order.guests.pets}</td>
                                <td>{order.guests.infants}</td>
                                <td>{order.stay.name}</td>
                                <td className={`status ${order.status}`}>{order.status}</td>
                                <td><div className='actions flex'>
                                    <button onClick={() => onAproveOrder(order)} >Aprove</button>
                                    <button onClick={() => onRejectOrder(order)}>Reject</button>
                                </div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <MyChart orders={orders} />
            </div>
        </div>
    )
}

