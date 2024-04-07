import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../store/order.actions'
import { NavLink } from 'react-router-dom'

export function Trips() {

    const orders = useSelector(storeState => storeState.orderModule.orders)

    useEffect(() => {
        loadOrders()
    }, [])

    if (!orders) return <div>loading.....</div>
    const pendingOrdersCount = orders.filter(order => order.status === "pending").length;

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

                <h1>Trips</h1>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

