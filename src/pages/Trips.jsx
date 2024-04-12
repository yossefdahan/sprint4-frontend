
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders } from '../store/order.actions';
import { NavLink } from 'react-router-dom';
import { utilService } from '../services/util.service';
import { SocialIconsTrips } from '../cmps/SocialIconsTrips'
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

            <div className="social-icons-container">
                <SocialIconsTrips />
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
