
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadOrders } from '../store/order.actions';
// import { NavLink } from 'react-router-dom';
// import { utilService } from '../services/util.service';
// import { SocialIconsTrips } from '../cmps/SocialIconsTrips'
// // import israelImg from '../assets/Img/israel.jpg'
// import { loadUsers } from '../store/user.actions';
// import { userService } from '../services/user.service';
// import { loadStays } from '../store/stay.actions';


// export function Trips() {

//     const orders = useSelector((storeState) => storeState.orderModule.orders)
//     const users = useSelector(storeState => storeState.userModule.users)
//     const stays = useSelector(storeState => storeState.stayModule.stays)
//     const loggedinUser = userService.getLoggedinUser()
//     useEffect(() => {
//         loadOrders()
//         loadUsers()
//         // loadStays()
//     }, [])

//     if (!orders || !users || !loggedinUser || !stays) return <div>No orders founds..</div>

//     const filteredOrders = orders.filter(order => {
//         const stay = stays.find(stay => stay._id === order.stay._id)
//         return stay && loggedinUser._id === order.buyer._id
//     })

//     function handleAddToCalendar(order, stay) {

//         const startDate = utilService.formatIsoDateToYMD(order.startDate).replace(/-/g, '');
//         const endDate = utilService.formatIsoDateToYMD(order.endDate).replace(/-/g, '');
//         const startTime = 'T000000';
//         const endTime = 'T235959';
//         const details = encodeURIComponent(`Stay at ${order.stay.name} with ${order.guests.adults} adults, ${order.guests.kids || 0} kids.`);
//         const location = encodeURIComponent(`${stay.loc.city}, ${stay.loc.country}`);
//         const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Trip to ${order.stay.name}&dates=${startDate}${startTime}/${endDate}${endTime}&details=${details}&location=${location}&sf=true&output=xml`;

//         window.open(googleCalendarUrl, '_blank');
//     }


//     return (
//         <div className="trips-page">
//             <div className="navigation-links">
//                 <NavLink to="/user/trips" activeClassName="active">Trips</NavLink>
//                 {/* {  <NavLink to="/user/dashboard" activeClassName="active">Dashboard</NavLink>} */}
//             </div>

//             <div className="social-icons-container">
//                 <SocialIconsTrips />
//             </div>
//             <section>
//                 <section>
//                     <h1></h1>
//                 </section>
//             </section>
//             <div className='dashboard-container'>

//                 <div className="trips-container ">

//                     {filteredOrders.map((order) => {
//                         const stay = stays.find(stay => stay._id === order.stay._id)
//                         // if (!stay) return null

//                         return (
//                             <div key={order._id} className="trip-card">
//                                 <div>
//                                     <button className="add-to-calender" onClick={() => handleAddToCalendar(order)}>
//                                         <svg xmlns="http://www.w3.org/2000/svg"
//                                             width="24" viewBox="0 0 24 24"
//                                             height="24"
//                                             fill="none"
//                                             className="svg-icon">
//                                             <g stroke-width="2" stroke-linecap="round" stroke="#fff">
//                                                 <rect y="5" x="4" width="16" rx="2" height="16"></rect>
//                                                 <path d="m8 3v4"></path><path d="m16 3v4"></path>
//                                                 <path d="m4 11h16"></path></g></svg>
//                                         <span className="lable">Add to Calendar</span></button>
//                                 </div>
//                                 <div className='trip-card-header flex space-between'>
//                                     <div>
//                                         <h2 className='stay-name-trips-card'>{stay.name}</h2>
//                                         <p><strong className='location-trips-card'> {stay.loc.city}, {stay.loc.country}</strong> </p>
//                                     </div>
//                                     <div className='right-section-header-trips flex column align-center'>
//                                         <img className="israel-img" src={stay.host.imgUrl} alt="Host" />
//                                         <p className='host-name-trips'>{stay.host.fullname}</p>
//                                     </div>
//                                 </div>
//                                 <div className='details-section-trips flex space-between align-center'>
//                                     <div>
//                                         <p><strong className='room-type-trips-card'> Stay Type:</strong> {stay.roomType}</p>
//                                         <p><strong className='start-date-trips-card'>Start Date:</strong> {utilService.formatIsoDateToYMD(order.startDate)}</p>
//                                         <p><strong className='end-dates-trips-card'>End Date:</strong> {utilService.formatIsoDateToYMD(order.endDate)}</p>
//                                         <p>
//                                             <strong className='guests-trips-card'>Guests:</strong>
//                                             {order.guests.adults ? ` Adults: ${order.guests.adults}` : ''}
//                                             {order.guests.kids ? ` | Kids: ${order.guests.kids}` : ''}
//                                             {order.guests.pets ? ` | Pets: ${order.guests.pets}` : ''}
//                                             {order.guests.infants ? ` | Infants: ${order.guests.infants}` : ''}
//                                         </p>
//                                     </div>
//                                     <div className='img-trips'>

//                                         <img className='trips-stay-img' src={stay.imgUrls[0]} alt="Stay" />
//                                     </div>
//                                 </div>
//                                 <div className='card-trips-footer flex space-between'>
//                                     <p><strong className='price-trips-card'>Total Price:</strong>  <span>${order.totalPrice.toFixed(2)}</span></p>
//                                     <p className={`status ${order.status}`}><strong>Status:</strong> {order.status}</p>
//                                 </div>
//                             </div>
//                         )
//                     })}
//                 </div>
//             </div>
//         </div>
//     )
// }
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders } from '../store/order.actions';
import { NavLink } from 'react-router-dom';
import { utilService } from '../services/util.service';
import { SocialIconsTrips } from '../cmps/SocialIconsTrips';
import { loadUsers } from '../store/user.actions';
import { userService } from '../services/user.service';
import { loadStays } from '../store/stay.actions';

export function Trips() {

    const orders = useSelector((storeState) => storeState.orderModule.orders);
    const users = useSelector(storeState => storeState.userModule.users);
    const stays = useSelector(storeState => storeState.stayModule.stays);
    const loggedinUser = userService.getLoggedinUser();

    useEffect(() => {
        loadOrders();
        loadUsers();
        loadStays();
    }, []);


    const filteredOrders = orders.filter(order => {
        const stay = stays.find(stay => stay._id === order.stay._id);
        return stay && loggedinUser._id === order.buyer._id;
    });

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
        const details = encodeURIComponent(`Stay at ${stay.name} with ${order.guests.adults} adults, ${order.guests.kids || 0} kids.`);
        const location = encodeURIComponent(`${stay.loc.city}, ${stay.loc.country}`);
        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Trip to ${stay.name}&dates=${startDate}${startTime}/${endDate}${endTime}&details=${details}&location=${location}&sf=true&output=xml`;

        window.open(googleCalendarUrl, '_blank');
    }

    if (filteredOrders.length === 0) {
        return <div className='loading-bar flex align-center'>
            <div className='loading-trips-title'>No orders founds..</div>
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

        <div div className="trips-page" >
            <div className="navigation-links">
                <NavLink to="/user/trips" activeClassName="active">Trips</NavLink>
            </div>

            <div className="social-icons-container ">
                <h2 className='social-header-trips flex align-center '>Plan Your Trip</h2>
                <SocialIconsTrips />
            </div>

            <div className='dashboard-container'>
                {/* if (!orders || !users || !loggedinUser || !stays) return <div> No orders founds..</div> */}

                <div className="trips-container">
                    {filteredOrders.map((order) => {
                        const stay = stays.find(stay => stay._id === order.stay._id);
                        if (!stay) return null;


                        return (

                            <div key={order._id} className="trip-card">
                                <div>
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
                                        <span className="lable">Add to Calendar</span></button>
                                </div>
                                <div className='trip-card-header flex space-between'>
                                    <div>
                                        <h2 className='stay-name-trips-card'>{stay.name}</h2>
                                        <p><strong className='location-trips-card'>{stay.loc.city}, {stay.loc.country}</strong></p>
                                    </div>
                                    <div className='right-section-header-trips flex column align-center'>
                                        <img className="israel-img" src={stay.host.imgUrl} alt="Host" />
                                        <p className='host-name-trips'>{stay.host.fullname}</p>
                                    </div>
                                </div>
                                <div className='details-section-trips flex space-between align-center'>
                                    <div>
                                        <p><strong className='room-type-trips-card'>Stay Type:</strong> {stay.roomType}</p>
                                        <p><strong className='start-date-trips-card'>Start Date:</strong> {utilService.formatIsoDateToYMD(order.startDate)}</p>
                                        <p><strong className='end-dates-trips-card'>End Date:</strong> {utilService.formatIsoDateToYMD(order.endDate)}</p>
                                        <p><strong className='guests-trips-card'>Guests:</strong> {`Adults: ${order.guests.adults} | Kids: ${order.guests.kids || 0} | Pets: ${order.guests.pets || 0} | Infants: ${order.guests.infants || 0}`}</p>
                                    </div>
                                    <div className='img-trips'>
                                        <img className='trips-stay-img' src={stay.imgUrls[0]} alt="Stay" />
                                    </div>
                                </div>
                                <div className='card-trips-footer flex space-between'>
                                    <p><strong className='price-trips-card'>Total Price:</strong> <span>${order.totalPrice.toFixed(2)}</span></p>
                                    <p className={`status ${order.status}`}><strong>Status:</strong> {order.status}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div >

    );
}

