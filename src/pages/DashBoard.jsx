import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadOrders, updateOrder, getActionAddOrder } from '../store/order.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { MyChart } from '../cmps/MyChart.jsx'
import { SalesChart } from '../cmps/SalesChart.jsx'
// import 'animate.css';

import { NavLink } from 'react-router-dom'
import { utilService } from '../services/util.service.js'
import { socketService } from '../services/socket.service.js'
import { loadStays } from '../store/stay.actions';

export function DashBoard() {
    const dispatch = useDispatch()
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const [orderUpdateTrigger, setOrderUpdateTrigger] = useState(false)
    const user = userService.getLoggedinUser()
    const [totalSales, setTotalSales] = useState(0)
    const [openModal, setModal] = useState(false)
    const [bestSellerStay, setBestSellerStay] = useState(null);
    const stays = useSelector(state => state.stayModule.stays);


    useEffect(() => {
        loadOrders();
    }, [orderUpdateTrigger])





    useEffect(() => {
        const salesByStay = orders.filter(order => order.status === 'approved')
            .reduce((acc, order) => {
                const key = order.stay._id;
                const stay = stays.find(stay => stay._id === key);
                if (stay && !acc[key]) {
                    acc[key] = {
                        details: order.stay,
                        totalRevenue: 0,
                        totalNights: 0,
                        imageUrl: stay.imgUrls && stay.imgUrls[0] ? stay.imgUrls[0] : 'default_image.jpg', // Safely access imgUrls
                        rating: order.stay.rating
                    };
                }
                if (stay) {
                    acc[key].totalRevenue += order.totalPrice;
                    const nights = (new Date(order.endDate) - new Date(order.startDate)) / (1000 * 3600 * 24);
                    acc[key].totalNights += nights;
                }
                return acc;
            }, {});

        const bestSeller = Object.values(salesByStay).reduce((max, stay) => max.totalRevenue > stay.totalRevenue ? max : stay, { totalRevenue: 0 });
        setBestSellerStay(bestSeller);
    }, [orders, stays]);


    useEffect(() => {
        socketService.on('add-order', (order) => {
            dispatch(getActionAddOrder(order))
        })
    }, [])

    const filteredOrders = orders.filter(order => order.hostId === user._id)
    const approvedOrders = filteredOrders.filter(order => order.status === 'approved');


    useEffect(() => {
        const approvedOrders = orders.filter(order => order.status === 'approved' && order.hostId === user._id);
        const totalSalesValue = approvedOrders.reduce((acc, order) => {
            return acc + order.totalPrice;
        }, 0);

        setTotalSales(totalSalesValue);
    }, [orders, user._id]);



    useEffect(() => {
        const totalSalesValue = approvedOrders.reduce((acc, order) => acc + order.totalPrice, 0);
        setTotalSales(totalSalesValue);
    }, [approvedOrders]);



    const sortedFilteredOrders = filteredOrders.sort((a, b) => {
        // Prioritize unapproved orders
        if (a.status !== 'approved' && b.status === 'approved') return -1;
        if (a.status === 'approved' && b.status !== 'approved') return 1;

        // If both have the same status, sort by startDate descending
        return new Date(b.startDate) - new Date(a.startDate);
    });

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
            showSuccessMsg(`Order updated : ${savedOrder.status}`)
            setOrderUpdateTrigger(!orderUpdateTrigger)


        } catch (err) {
            //setOrderUpdateTrigger(!orderUpdateTrigger)
            showErrorMsg('Cannot update order')
        }
    }


    if (!orders || orders.length === 0) return <div className='loading'>No orders yet...</div>;

    return (
        <div className="trips-page dashboard-page">
            <div className="navigation-links">
                <NavLink to="/user/trips" activeClassName="active">Trips</NavLink>
                <NavLink to="/user/dashboard" activeClassName="active">Dashboard</NavLink>
            </div>

            <div className='stat-section flex space-between '>

                <div className='chart content-card'>
                    <h2 className='header-sales flex space-between'><strong>Orders status:</strong> <i className="fa-solid fa-house-user" style={{ fontSize: "18px" }}></i></h2>
                    <MyChart orders={orders.filter(order => order.hostId === user._id)} />
                </div>

                <div className=' small-cards-total flex column'>
                    <div className='small-card' >
                        <h2 className='header-sales flex space-between'><strong>Total Sales:</strong> <i className="fa-solid fa-hand-holding-dollar" style={{ fontSize: "18px" }}></i></h2>
                        <p className='total-sales-income'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalSales)} <i className="fa-solid fa-arrow-trend-up" style={{ color: "#63E6BE" }}></i></p>
                    </div>
                    <div className='small-card' >
                        <h2 className='header-sales flex space-between'><strong>Total orders:</strong><i className="fa-solid fa-people-roof" style={{ fontSize: "18px" }}></i></h2>
                        <p className='total-orders'> {filteredOrders.length}</p>
                    </div>
                </div>

                <div className='sales-chart content-card '>
                    <h2 className='header-sales flex space-between'><strong>Month Sales:</strong> <i className="fa-solid fa-chart-simple" style={{ fontSize: "18px" }}></i></h2>
                    <SalesChart orders={approvedOrders} />
                </div>


                <div className='best-seller '>
                    <h2 className='bestseller-header-sales flex space-between'><strong>Best Seller Stay:</strong> <i className="fa-solid fa-trophy" style={{ fontSize: "18px" }}></i></h2>
                    {bestSellerStay && bestSellerStay.details ? (
                        <div className='bestseller-card flex space-between'>
                            <div className='bestseller-card-info'>
                                <p className='bestseller-name'>{bestSellerStay.details.name}</p>
                                <p><span>Revenue:</span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(bestSellerStay.totalRevenue)} </p>
                                <p><span>Orders:</span>{bestSellerStay.totalNights} Nights</p>
                                <p><span>Rating:</span>★{bestSellerStay.rating || '4.7'}</p>
                            </div>
                            <div>
                                <img className='bestseller-img' src={bestSellerStay.imageUrl || 'default_image.jpg'} alt={bestSellerStay.details.name} style={{ width: '200px', height: '150px', objectFit: 'cover' }} />
                            </div>
                        </div>

                    ) : (
                        <p>No best seller yet.</p>
                    )}
                </div>

            </div >

            <div className="dashboard-container">
                <table>
                    <thead>
                        <tr>
                            <th>Buyer Full Name</th>
                            <th>Total Price</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Guests</th>
                            <th>Stay Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedFilteredOrders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.buyer.fullname}</td>
                                <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.totalPrice)}</td>

                                <td>{utilService.formatIsoDateToYMDDashboard(order.startDate)}</td>
                                <td>{utilService.formatIsoDateToYMDDashboard(order.endDate)}</td>
                                <td>
                                    {order.guests.adults ? ` Adults: ${order.guests.adults}` : ''}
                                    {order.guests.kids ? ` , Kids: ${order.guests.kids}` : ''}
                                    {order.guests.pets ? ` , Pets: ${order.guests.pets}` : ''}
                                    {order.guests.infants ? ` , Infants: ${order.guests.infants}` : ''}
                                </td>

                                <td>{order.stay.name}</td>
                                <td className={`status ${order.status}`}>{order.status}</td>
                                <td>
                                    {order.status === "approved" ?
                                        <div>
                                            <button className='user-msg-btn'>Send massage to guest</button>
                                        </div> :
                                        <div className='actions flex'>
                                            <button onClick={() => onAproveOrder(order)} >Approve</button>
                                            <button onClick={() => onRejectOrder(order)}>Reject</button>
                                        </div>}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        
        </div >
    )
}

