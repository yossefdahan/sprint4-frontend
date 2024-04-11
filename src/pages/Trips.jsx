// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { loadOrders } from '../store/order.actions'
// import { NavLink } from 'react-router-dom'
// import { utilService } from '../services/util.service'

// export function Trips() {

//     const orders = useSelector(storeState => storeState.orderModule.orders)

//     useEffect(() => {
//         loadOrders()
//     }, [])

//     if (!orders) return <div>loading.....</div>

//     return (
//         <div className="trips-page">
//             <div className="navigation-links">
//                 <NavLink to="/user/trips" activeClassName="active">Trips</NavLink>
//                 <NavLink to="/user/dashboard" activeClassName="active">Dashboard</NavLink>
//             </div>
//             <section>
//                 <h1></h1>
//             </section>
//             <div className="trips-container">

//                 <h1>Trips</h1>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Buyer Full Name</th>
//                             <th>Total Price</th>
//                             <th>Start Date</th>
//                             <th>End Date</th>
//                             <th>Adults</th>
//                             <th>Kids</th>
//                             <th>Pets</th>
//                             <th>Infants</th>
//                             <th>Stay Name</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orders.map((order) => (
//                             <tr key={order.buyer._id}>
//                                 <td>{order.buyer.fullname}</td>
//                                 <td>${order.totalPrice.toFixed(2)}</td>
//                                 <td>{utilService.formatIsoDateToYMD(order.startDate)}</td>
//                                 <td>{utilService.formatIsoDateToYMD(order.endDate)}</td>
//                                 <td>{order.guests.adults ? order.guests.adults : ''}</td>
//                                 <td>{order.guests.kids ? order.guests.kids : ''}</td>
//                                 <td>{order.guests.pets ? order.guests.pets : ''}</td>
//                                 <td>{order.guests.infants ? order.guests.infants : ''}</td>
//                                 <td>{order.stay.name}</td>
//                                 <td className={`status ${order.status}`}>{order.status}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders } from '../store/order.actions';
import { NavLink } from 'react-router-dom';
import { utilService } from '../services/util.service';
import israelImg from '../assets/Img/israel.jpg'

export function Trips() {
    const orders = useSelector((storeState) => storeState.orderModule.orders);

    useEffect(() => {
        loadOrders();
    }, []);

    if (!orders) return <div>loading.....</div>;

    return (
        <div className="trips-page">
            <div className="navigation-links">
                <NavLink to="/user/trips" activeClassName="active">Trips</NavLink>
                <NavLink to="/user/dashboard" activeClassName="active">Dashboard</NavLink>
            </div>
            <section>
                <section>
                    <h1></h1>
                </section>
            </section>
            <div className='dashboard-container'>
                <div className="trips-container ">
                    {orders.map((order) => (
                        <div key={order.buyer._id} className="trip-card ">
                            <div className='trip-card-header flex space-between'>
                                <h2 className='stay-name-trips-card'>{order.stay.name}</h2>
                                <div className='right-seciton-header-trips  flex column align-center '>
                                    <img className="israel-img" src={israelImg} />
                                    <p className='host-name-trips'>Arik john</p>
                                </div>
                            </div>
                            {/* <p><strong className='full-name-trips-card'>Full Name:</strong> {order.buyer.fullname}</p> */}
                            <div className='details-section-trips flex space-between align-center'>
                                <div >
                                    <p><strong className='start-date-trips-card' >Start Date:</strong> {utilService.formatIsoDateToYMD(order.startDate)}</p>
                                    <p><strong className='end-dates-trips-card'>End Date:</strong> {utilService.formatIsoDateToYMD(order.endDate)}</p>
                                    <p>
                                        <strong className='guests-trips-card'>Guests:</strong>
                                        {order.guests.adults ? ` Adults: ${order.guests.adults}` : ''}
                                        {order.guests.kids ? ` | Kids: ${order.guests.kids}` : ''}
                                        {order.guests.pets ? ` | Pets: ${order.guests.pets}` : ''}
                                        {order.guests.infants ? ` | Infants: ${order.guests.infants}` : ''}
                                    </p>
                                </div>
                                <div className='img-trips'>
                                    <img className='trips-stay-img' src='/public/img/11.jpg'></img>
                                </div>
                            </div>
                            <div className='card-trips-footer flex space-between'>
                                <p><strong className='price-trips-card'>Total Price:</strong>  <span>${order.totalPrice.toFixed(2)}</span></p>
                                <p className={`status ${order.status}`}><strong>Status:</strong> {order.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
