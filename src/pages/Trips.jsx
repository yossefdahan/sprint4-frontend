
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActionUpdateOrder, loadOrders } from '../store/order.actions';
import { Link, NavLink } from 'react-router-dom';
import { utilService } from '../services/util.service';
import { SocialIconsTrips } from '../cmps/SocialIconsTrips';
import { loadUsers } from '../store/user.actions';
import { userService } from '../services/user.service';
import { loadStays } from '../store/stay.actions';
import { socketService } from '../services/socket.service';



export function Trips(stay) {
    const dispatch = useDispatch()
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

    useEffect(() => {
        socketService.on('order-status', (updatedOrder) => {
            console.log('Order updated via socket:', updatedOrder);
            loadOrders()
        });

        return () => {
            socketService.off('order-status');
        };
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

    const formatDateRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const month = start.toLocaleString('en-US', { month: 'short' }); // Ensure English month
        const dateRange = `${start.getDate()} – ${end.getDate()}`;
        const year = start.getFullYear();
        return (
            <div style={{ paddingLeft: "10px", fontSize: "14px" }}>
                <div>{month}</div>
                <div>{dateRange}</div>
                <div>{year}</div>
            </div>
        );
        // return `${start.toLocaleString('default', { month: 'short' })} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
    };


    /*hard coded past-trips */
    const pastTrips = [
        {
            location: 'Funchal',
            description: 'Hosted by An Island',
            dateRange: 'Aug 31 - Sep 4, 2023',
            imgUrl: '/path-to-your-image.jpg', // replace with your image path
        },
        // Add more past trips here
    ];


    /*footer */
    const Footer = () => {
        return (
            <footer className="app-footer">
                <nav className="footer-nav">
                    <Link to="/" className="  footer-nav-link"> <i className="fa-solid fa-magnifying-glass"></i>Explore</Link>
                    <Link style={{ color: "red", fontWeight: "500" }} to="/user/trips" className="  footer-nav-link"> <i className="fa-brands fa-airbnb"></i>Trips</Link>
                    <Link to="/user/addstay" className=" footer-nav-link"><i className="fa-solid fa-house-flag"></i>Add Stay </Link>
                    {/* <Link to="/user/dashboard" className="  footer-nav-link"> <i className="fa-solid fa-chart-line"></i>Dashboard</Link> */}
                </nav>

            </footer>
        );
    };

    /*loading */
    if (filteredOrders.length === 0) {
        return <div className='loading-bar flex align-center'>
            <div className='loading-trips-title'>Loading..</div>
            <section className="loader-trips">
                <div>
                    <div>
                        <span className="one h6"></span>
                        <span className="two h3"></span>
                    </div>
                </div>

                <div>
                    <div>
                        <span className="one h1"></span>
                    </div>
                </div>

                <div>
                    <div>
                        <span className="two h2"></span>
                    </div>
                </div>
                <div>
                    <div>
                        <span className="one h4"></span>
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


                <h2 className='upcoming-trips-title'> Upcoming Reservitions</h2>

                {/* <div className='dashboard-container'> */}

                <div className="trips-container">

                    {sortedOrders.map((order) => {
                        const stay = stays.find(stay => stay._id === order.stay._id);
                        if (!stay) return null;

                        return (
                            <div key={order._id} className="trip-card">


                                <div className='main-card-section'>
                                    <div className='trip-card-header '>
                                        <div className="head-section" style={{ borderBottom: "1px solid $light-gray" }}>
                                            <h2><strong className='location-trips-card'>{stay.loc.city}, {stay.loc.country}</strong></h2>
                                            <p className='stay-name-trips-card'> {stay.roomType} hosted by {stay.host.fullname}</p>
                                            {/* <p className='stay-name-trips-card'>{stay.name}</p> */}
                                        </div>

                                        <div className="details-section-trips flex space-between" style={{ padding: "10px 0 10px 0" }}>
                                            <div style={{ marginRight: "20px" }}>

                                                <p>{formatDateRange(order.startDate, order.endDate)}</p>
                                            </div>
                                            <div className='location-details-trips' style={{ paddingLeft: "10px", margin: "0", fontSize: "0.875em", maxWidth: "350px", minWidth: "200px" }}>
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
                                        <img className='trips-stay-img' src={stay.imgUrls[0]} alt="Stay" />
                                    </div>


                                </div>
                            </div>
                        );
                    })}
                </div >
            </div >
            {/* </div > */}
            <div className="past-trips-section" style={{ paddingLeft: "20px" }}>
                <h2>Where you've been</h2>
                <section className=' past-trips flex' >
                    <div className='last-trip-card flex align-center' style={{ paddingRight: "30px" }}>
                        <div style={{ paddingRight: "10px" }} >
                            <img src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg" style={{ width: "105px", borderRadius: "12px" }} />
                        </div>
                        <div >
                            <h4 style={{ marginTop: "0", marginBottom: "5px", paddingLeft: "5px", fontSize: "1em" }}>New York</h4>
                            <p style={{ marginLeft: "5px", fontSize: "0.85em" }}>Hosted by israel jon</p>
                            <p style={{ marginLeft: "5px", fontSize: "0.85em" }}>May 10 - May 28, 2022</p>
                        </div>
                    </div>
                    <div className=' last-trip-card flex align-center' style={{ paddingRight: "30px" }}>
                        <div style={{ paddingRight: "10px" }} >
                            <img src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg" style={{ width: "105px", borderRadius: "12px" }} />
                        </div>
                        <div >
                            <h4 style={{ marginTop: "0", marginBottom: "5px", paddingLeft: "5px", fontSize: "1em" }}>Barcelona</h4>
                            <p style={{ marginLeft: "5px", fontSize: "0.85em" }}>Hosted by yan kon</p>
                            <p style={{ marginLeft: "5px", fontSize: "0.85em" }}>Apr 1 - Apr 6, 2023</p>
                        </div>
                    </div>
                    <div className=' last-trip-card flex align-center'>
                        <div style={{ paddingRight: "10px" }} >
                            <img src="http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436287/my8eunlgiiflc2ohslgx.jpg" style={{ width: "105px", borderRadius: "12px" }} />
                        </div>
                        <div >
                            <h4 style={{ marginTop: "0", marginBottom: "5px", paddingLeft: "5px", fontSize: "1em" }}>Amsterdam</h4>
                            <p style={{ marginLeft: "5px", fontSize: "0.85em" }}>Hosted by Alex welt</p>
                            <p style={{ marginLeft: "5px", fontSize: "0.85em" }}>jun 8 - jun 15, 2024</p>
                        </div>
                    </div>
                </section >
                <div className="social-icons-container ">
                    <h2 className='social-header-trips flex align-center '>Plan Your Trip</h2>
                    <SocialIconsTrips />
                </div>
            </div >
            <Footer />
        </>
    );
}

