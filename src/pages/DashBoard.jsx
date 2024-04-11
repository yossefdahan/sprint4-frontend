import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders, updateOrder } from '../store/order.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { MyChart } from '../cmps/MyChart.jsx'

import { NavLink } from 'react-router-dom'
import { utilService } from '../services/util.service.js'

export function DashBoard() {

    const orders = useSelector(storeState => storeState.orderModule.orders)
    const [orderUpdateTrigger, setOrderUpdateTrigger] = useState(false)
    const [totalSales, setTotalSales] = useState(0);


    useEffect(() => {
        loadOrders()
    }, [orderUpdateTrigger])

    useEffect(() => {
        if (orders) {
            const total = orders.reduce((acc, order) => acc + order.totalPrice, 0);
            setTotalSales(total);
        }
    }, [orders]);


    async function onAproveOrder(order) {
        try {
            order.status = 'approved'
            const savedOrder = await updateOrder(order)
            setOrderUpdateTrigger(!orderUpdateTrigger)
            showSuccessMsg(`order updated : ${savedOrder.status}`)
        } catch (err) {
            //setOrderUpdateTrigger(!orderUpdateTrigger)
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
            //setOrderUpdateTrigger(!orderUpdateTrigger)
            showErrorMsg('Cannot update order')
        }
    }


    if (!orders) return <div className='loading'>loading.....</div>

    return (
        <div className="trips-page">
            <div className="navigation-links">
                <NavLink to="/user/trips" activeClassName="active">Trips</NavLink>
                <NavLink to="/user/dashboard" activeClassName="active">Dashboard</NavLink>
            </div>

            <div className='stat-section flex space-between '>
                <div className='chart'>
                    <MyChart orders={orders} />

                </div>
                <div className='total-sales flex column '>
                    <h2><strong>Total Sales:</strong></h2>
                    <p className='total-sales-income'> ${totalSales.toFixed(2)}</p>
                </div>

                <div className='chart4'>test</div>
                <div className='chart5'>test2</div>
            </div>

            <div className="dashboard-container">

                <table>
                    <thead>
                        <tr>
                            <th>Buyer Full Name</th>
                            <th>Total Price</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Guests</th>

                            {/* <th>Adults</th>
                            <th>Kids</th>
                            <th>Pets</th>
                            <th>Infants</th> */}
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
                                <td>{utilService.formatIsoDateToYMD(order.startDate)}</td>
                                <td>{utilService.formatIsoDateToYMD(order.endDate)}</td>
                                <td>
                                    {/* <strong className='guests-trips-card'>Guests:</strong> */}
                                    {order.guests.adults ? ` Adults: ${order.guests.adults}` : ''}
                                    {order.guests.kids ? ` , Kids: ${order.guests.kids}` : ''}
                                    {order.guests.pets ? ` , Pets: ${order.guests.pets}` : ''}
                                    {order.guests.infants ? ` , Infants: ${order.guests.infants}` : ''}
                                </td>
                                {/* <td>{order.guests.adults ? order.guests.adults : ''}</td>
                                <td>{order.guests.kids ? order.guests.kids : ''}</td>
                                <td>{order.guests.pets ? order.guests.pets : ''}</td>
                                <td>{order.guests.infants ? order.guests.infants : ''}</td> */}
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
            </div>
        </div>
    )
}

