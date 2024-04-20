
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
        // loadStays();

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
            <footer className="app-footer-trips">
                <nav className="footer-nav">
                    <Link to="/" className="footer-nav-link"> <i className="fa-solid fa-magnifying-glass"></i>Explore</Link>
                    <Link style={{ color: "red", fontWeight: "500" }} to="/user/trips" className="footer-nav-link"> <i className="fa-brands fa-airbnb"></i>Trips</Link>
                    <Link to="/user/addstay" className="footer-nav-link"><i className="fa-solid fa-house-flag"></i>Add Stay </Link>
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

            <div className="trips-page" >
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
                                            {/* <svg xmlns="http://www.w3.org/2000/svg"
                                                width="24" viewBox="0 0 24 24"
                                                height="24"
                                                fill="none"
                                                className="svg-icon">
                                                <g stroke-width="2" strokeLinecap="round" stroke="#fff">
                                                    <rect y="5" x="4" width="16" rx="2" height="16"></rect>
                                                    <path d="m8 3v4"></path><path d="m16 3v4"></path>
                                                    <path d="m4 11h16"></path></g>
                                                </svg> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" id="Capa_1" viewBox="0 0 512 512" width="30px" height="30px">
                                                <g>
                                                    <path id="Path_15_" d="m176.539 330.307c-10.072-6.804-17.044-16.741-20.851-29.878l23.377-9.634c2.122 8.084 5.827 14.349 11.116 18.796 5.255 4.446 11.655 6.636 19.133 6.636 7.646 0 14.215-2.324 19.705-6.973 5.491-4.648 8.253-10.577 8.253-17.752 0-7.343-2.897-13.339-8.691-17.987s-13.069-6.973-21.76-6.973h-13.507v-23.141h12.126c7.478 0 13.777-2.021 18.897-6.063s7.68-9.566 7.68-16.606c0-6.265-2.291-11.251-6.872-14.989-4.581-3.739-10.375-5.625-17.415-5.625-6.872 0-12.328 1.819-16.371 5.491-4.042 3.672-6.973 8.185-8.825 13.507l-23.141-9.634c3.065-8.691 8.691-16.371 16.943-23.006 8.253-6.636 18.796-9.971 31.596-9.971 9.465 0 17.987 1.819 25.533 5.491 7.545 3.672 13.474 8.758 17.752 15.225 4.278 6.501 6.4 13.777 6.4 21.861 0 8.253-1.987 15.225-5.962 20.952-3.975 5.726-8.859 10.105-14.653 13.171v1.381c7.646 3.2 13.878 8.084 18.796 14.653 4.884 6.568 7.343 14.417 7.343 23.579s-2.324 17.347-6.973 24.522c-4.648 7.175-11.082 12.834-19.234 16.943-8.185 4.109-17.381 6.198-27.587 6.198-11.823.033-22.736-3.369-32.808-10.174z" fill="#0085f7" />
                                                    <path id="Path_14_" d="m320.135 214.299-25.668 18.56-12.833-19.47 46.046-33.212h17.651v156.665h-25.196z" fill="#0085f7" />
                                                    <path id="Path_3_" d="m390.737 390.737h-269.474l-38.574 56.837 38.574 64.426h269.474l31.868-68.546z" fill="#00a94b" />
                                                    <path id="Path_4_" d="m390.737 0h-350.316c-22.333 0-40.421 18.088-40.421 40.421v350.316l60.632 43.103 60.632-43.103v-269.474h269.474l41.482-60.632z" fill="#0085f7" />
                                                    <path id="Path_5_" d="m0 390.737v80.842c0 22.333 18.088 40.421 40.421 40.421h80.842v-121.263z" fill="#00802e" />
                                                    <path id="Path_6_" d="m512 121.263-60.632-39.014-60.631 39.014v269.474l54.529 28.463 66.734-28.463z" fill="#ffbc00" />
                                                    <path id="Path_2_" d="m512 121.263v-80.842c0-22.333-18.088-40.421-40.421-40.421h-80.842v121.263z" fill="#0067d5" />
                                                    <path id="Path_1_" d="m390.737 512 121.263-121.263h-121.263z" fill="#ff4131" />
                                                </g>
                                            </svg>
                                            <span className="lable"></span>
                                        </button>
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

