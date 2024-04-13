
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders } from '../store/order.actions';
import { NavLink } from 'react-router-dom';
import { utilService } from '../services/util.service';
import { SocialIconsTrips } from '../cmps/SocialIconsTrips'
// import israelImg from '../assets/Img/israel.jpg'
import { loadUsers } from '../store/user.actions';
import { userService } from '../services/user.service';
import { loadStays } from '../store/stay.actions';


export function Trips() {

    const orders = useSelector((storeState) => storeState.orderModule.orders)
    const users = useSelector(storeState => storeState.userModule.users)
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const loggedinUser = userService.getLoggedinUser()
    useEffect(() => {
        loadOrders()
        loadUsers()
        // loadStays()
    }, [])

    if (!orders || !users || !loggedinUser || !stays) return <div>No orders founds..</div>
    const filteredOrders = orders.filter(order => {
        const stay = stays.find(stay => stay._id === order.stay._id)
        return stay && loggedinUser._id === order.buyer._id
    })



    return (
        <div className="trips-page">
            <div className="navigation-links">
                <NavLink to="/user/trips" activeClassName="active">Trips</NavLink>
                {/* {  <NavLink to="/user/dashboard" activeClassName="active">Dashboard</NavLink>} */}
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

                    {filteredOrders.map((order) => {
                        const stay = stays.find(stay => stay._id === order.stay._id)
                        // if (!stay) return null

                        return (
                            <div key={order._id} className="trip-card">
                                <div className='trip-card-header flex space-between'>
                                    <h2 className='stay-name-trips-card'>{stay.name}</h2>
                                    <div className='right-section-header-trips flex column align-center'>
                                        <img className="israel-img" src={stay.host.imgUrl} alt="Host" />
                                        <p className='host-name-trips'>{stay.host.fullname}</p>
                                    </div>
                                </div>
                                <div className='details-section-trips flex space-between align-center'>
                                    <div>
                                        <p><strong className='start-date-trips-card'>Start Date:</strong> {utilService.formatIsoDateToYMD(order.startDate)}</p>
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

                                        <img className='trips-stay-img' src={stay.imgUrls[0]} alt="Stay" />
                                    </div>
                                </div>
                                <div className='card-trips-footer flex space-between'>
                                    <p><strong className='price-trips-card'>Total Price:</strong>  <span>${order.totalPrice.toFixed(2)}</span></p>
                                    <p className={`status ${order.status}`}><strong>Status:</strong> {order.status}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}