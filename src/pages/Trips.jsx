
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders } from '../store/order.actions';
import { NavLink } from 'react-router-dom';
import { utilService } from '../services/util.service';
import { SocialIconsTrips } from '../cmps/SocialIconsTrips';
import { loadUsers } from '../store/user.actions';
import { userService } from '../services/user.service';
import { loadStays } from '../store/stay.actions';



export function Trips(stay) {

    const orders = useSelector((storeState) => storeState.orderModule.orders);
    const users = useSelector(storeState => storeState.userModule.users);
    const stays = useSelector(storeState => storeState.stayModule.stays);
    const loggedinUser = userService.getLoggedinUser();
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        loadOrders();
        loadUsers();
        loadStays();
    }, []);


    const filteredOrders = orders.filter(order => {
        const stay = stays.find(stay => stay._id === order.stay._id);
        return stay && loggedinUser._id === order.buyer._id;
    });

    let sortedOrders;
    if (sortBy === 'newest') {
        // Reverse the filtered orders to show the newest first
        sortedOrders = [...filteredOrders].reverse();
    } else if (sortBy === 'earliestDate') {
        // Sort by earliest start date
        sortedOrders = [...filteredOrders].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }


    function handleAddToCalendar(order, stay) {
        if (!stay) {
            console.error('Stay details are missing');
            return;
        }

        const startDateFormatted = utilService.formatIsoDateToYMD(order.startDate);
        const endDateFormatted = utilService.formatIsoDateToYMD(order.endDate);
        const startDate = startDateFormatted.replace(/\//g, '');
        const endDate = endDateFormatted.replace(/\//g, '');
        const startTime = 'T000000';
        const endTime = 'T235959';
        const details = encodeURIComponent(`Stay at ${stay.name}`);
        const location = encodeURIComponent(`${stay.loc.city}, ${stay.loc.country}`);
        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Trip to ${stay.name}&dates=${startDate}${startTime}/${endDate}${endTime}&details=${details}&location=${location}&sf=true&output=xml`;

        window.open(googleCalendarUrl, '_blank');
    }

    if (filteredOrders.length === 0) {
        return <div className='loading-bar flex align-center'>
            <div className='loading-trips-title'>Loading..</div>
            <section class="loader-trips">
                <div>
                    <div>
                        <span class="one h6"></span>
                        <span class="two h3"></span>
                    </div>
                </div>

                <div>
                    <div>
                        <span class="one h1"></span>
                    </div>
                </div>

                <div>
                    <div>
                        <span class="two h2"></span>
                    </div>
                </div>
                <div>
                    <div>
                        <span class="one h4"></span>
                    </div>
                </div>
            </section>
        </div>
    }


    return (
        <>

            <div div className="trips-page" >
                <div className="navigation-links">
                    <NavLink to="/user/trips" activeClassName="active">Trips</NavLink>
                </div>

                <div className="social-icons-container ">
                    <h2 className='social-header-trips flex align-center '>Plan Your Trip</h2>
                    <SocialIconsTrips />
                </div>
                <h2 className='upcoming-trips-title'> Upcoming Reservitions</h2>

                <div className='dashboard-container'>

                    <div className="trips-container">
                        {/* {filteredOrders.map((order) => {
                            const stay = stays.find(stay => stay._id === order.stay._id);
                            if (!stay) return null; */}
                        {sortedOrders.map((order) => {
                            const stay = stays.find(stay => stay._id === order.stay._id);
                            if (!stay) return null;

                            return (
                                <div key={order._id} className="trip-card">
                                    {/* <div>
                                        <button className="add-to-calender" o onClick={() => handleAddToCalendar(order, stay)}>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                width="24" viewBox="0 0 24 24"
                                                height="24"
                                                fill="none"
                                                className="svg-icon">
                                                <g stroke-width="2" stroke-linecap="round" stroke="#fff">
                                                    <rect y="5" x="4" width="16" rx="2" height="16"></rect>
                                                    <path d="m8 3v4"></path><path d="m16 3v4"></path>
                                                    <path d="m4 11h16"></path></g></svg>
                                            <span className="lable"></span></button>
                                    </div> */}
                                    <div className='flex'>
                                        <div className='trip-card-header ' style={{ width: "500px" }}>
                                            <div className="head-section" style={{ borderBottom: "1px solid $light-gray" }}>
                                                <h2><strong className='location-trips-card'>{stay.loc.city}, {stay.loc.country}</strong></h2>
                                                <p className='stay-name-trips-card'> {stay.roomType} hosted by {stay.host.fullname}</p>
                                                {/* <p className='stay-name-trips-card'>{stay.name}</p> */}
                                            </div>

                                            <div className="details-section-trips flex space-between" style={{ width: "400px", padding: "10px 0 10px 0" }}>
                                                <div style={{ marginRight: "20px" }}>
                                                    <p><strong className='start-date-trips-card'></strong> {utilService.formatIsoDateToYMD(order.startDate)}</p>
                                                    <p><strong className='end-dates-trips-card'></strong> {utilService.formatIsoDateToYMD(order.endDate)}</p>
                                                </div>
                                                <div className='location-details-trips' style={{ paddingLeft: "10px", margin: "0", fontSize: "0.875em", width: "250px" }}>
                                                    <p><strong className='location-details-trips-card'>{stay.loc.address} </strong></p>
                                                    <p><strong className='location-details-trips-card'>{stay.loc.city}</strong></p>
                                                    <p><strong className='location-details-trips-card'>{stay.loc.country}</strong></p>
                                                </div>


                                            </div>
                                            <div className='card-trips-footer flex'>
                                                <p className="price-trips-card"><strong>Total price:</strong> <span>${order.totalPrice.toFixed(2)}</span></p>
                                                <p className={`status ${order.status}`}><strong>Status:</strong> {order.status}</p>
                                            </div>

                                        </div>


                                        <div className='img-trips'>
                                            <img className='trips-stay-img' src={stay.imgUrls[0]} alt="Stay" />
                                        </div>


                                    </div>

                                </div>
                            );
                        })}
                    </div >
                </div >
            </div >
        </>
    );
}

