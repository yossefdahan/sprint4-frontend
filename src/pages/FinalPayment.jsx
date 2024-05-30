import { userService } from '../services/user.service.js'
import { useState, useEffect } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { orderService } from '../services/order.service.js'
import { stayService } from '../services/stay.service.js'
import { SET_ORDER } from '../store/order.reducer.js'
import { addOrder, getActionAddOrder } from '../store/order.actions.js'
import { PaymentRequest } from '../cmps/PaymentRequest.jsx'
import { utilService } from '../services/util.service.js'
import { LoginSignup } from '../cmps/LoginSignup.jsx'


export function FinalPayment() {
    // const [order, setOrder] = useState(orderService)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const order = useSelector(storeState => storeState.orderModule.order)
    const { stayId } = useParams()
    const [stay, setStay] = useState(null)
    const [isOpen, setOpen] = useState(false)
    const [buttonColor, setButtonColor] = useState('hsl(351, 83%, 50%)');
    const user = useSelector(storeState => storeState.userModule.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleModal = () => setIsModalOpen(!isModalOpen)

    // useEffect(()=>{
    //     loadOrder()
    // },[])
    // export async function loadOrder(userId) {
    //     try {
    //         const user = await orderService.getById(userId)
    //         store.dispatch({ type: SET_WATCHED_USER, user })
    //     } catch (err) {
    //         showErrorMsg('Cannot load user')
    //         console.log('Cannot load user', err)
    //     }
    // }


    useEffect(() => {
        loadStay()
        loadOrderProgres()
    }, [stayId])

    async function loadOrderProgres() {
        try {
            const order = await orderService.getOrderPending()
            dispatch({ type: SET_ORDER, order })
        } catch (err) {
            console.log('loadOrderProgree: err in orderInProgress', err)
            throw err
        }
    }

    function dealMade(ev) {
        ev.preventDefault()
        addOrder(order)
        navigate('/')
        console.log('complete!')
    }

    function openModal() {
        setOpen(!isOpen)

    }

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            // showErrorMsg('Cant load ')
            navigate('/')
        }
    }

    const handleMouseMove = (event) => {
        const { clientY, target } = event;
        const { top, height } = target.getBoundingClientRect();
        const yRatio = (clientY - top) / height;

        const lightness = 40 + (20 * yRatio);
        setButtonColor(`hsl(351, 83%, ${lightness}%)`);
    };

    if (!stay || !order) return <div className='loader'></div>
    const rate = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
    function formatDateRange(startDateStr, endDateStr) {
        const startDate = new Date(startDateStr)
        const endDate = new Date(endDateStr)
        const options = { month: 'short', day: 'numeric' }
        const formattedStartDate = startDate.toLocaleDateString('en-US', options)
        const formattedEndDate = endDate.toLocaleDateString('en-US', options)
        return `${formattedStartDate} – ${formattedEndDate}`
    }
    return (
        <div className='main-payment-page'>
            {isModalOpen === true ? <LoginSignup onClose={toggleModal} /> : ''}
            <div className='main-title-container'>
                <h1 className='main-title'> Request to book</h1>
            </div>
            <section className='payment-page'>


                <section className='lay-pay'>
                    {isOpen ? <PaymentRequest isOpen={isOpen} setOpen={setOpen} guests={order.guests}
                        order={order}
                        stay={stay} /> : ''}
                    <span className='back-btn'><Link className='go-back-link-payment' to={`/stay/${stayId}`}>{'<'}</Link></span>

                    <div>
                        <h2 className='trip-title'>Your trip</h2>
                        <div className='da-title'>
                            <h3>Dates</h3>
                            <h4><span>{formatDateRange(order.startDate, order.endDate)}</span></h4>
                        </div>
                        <div className='gu-title'>
                            <h3>Guests</h3>
                            <h4><span>{Object.values(order.guests).reduce((acc, guestCount) => acc + guestCount, 0)}</span> <span>guests</span></h4>
                        </div>
                    </div>

                    <div className="credit-card-input">
                        <h3>Pay with</h3>
                        <div className="inputs-group">

                            <input type="text" className="card-number " placeholder=" 1234-9251-4218-0828" />
                            <div className="input-group-twice">
                                <input type="text" className="expiry-date" placeholder="05/29" />
                                <input type="text" className="cvv" placeholder="357" />
                            </div>
                            <div className="input-g">
                                <input type="text" className="name-on-card" placeholder="306050221" />
                            </div>
                        </div>
                    </div>

                    <div className='policy-title'>
                        <h2>Cancellation policy</h2>
                        <p>Free cancellation before Apr 27. <br />
                            Cancel before check-in on May 2 for a partial refund. </p>
                    </div>
                    <div className='ground-title'>
                        <h2 >Ground rules</h2>
                        <p>We ask every guest to remember a few simple things about what makes a great guest.</p>
                        <ul>
                            <li>Follow the house rules</li>
                            <li>Treat your Host’s home like your own</li>
                        </ul>
                    </div>

                    <div className='calltoAction'>
                        <p>By selecting the button below, I agree to the Host's House Rules, Ground rules for guests, Airbnb's Rebooking and Refund Policy, and that Airbnb can charge my payment method if I’m responsible for damage.</p>
                        {user ? <button onMouseMove={handleMouseMove} onMouseOut={() => setButtonColor('#ff385c')} onClick={openModal}>Request to book</button>
                            : <button onMouseMove={handleMouseMove} onMouseOut={() => setButtonColor('#ff385c')} onClick={() =>setIsModalOpen(!isModalOpen)}>Request to book</button>}
                    </div>



                    {/* <span>{order._id}</span> */}
                </section>
                <section className='paymentModal' >
                    <div className='finishOrder'>
                        <section className='title-container'>
                            <section >
                                <div className='header-pay'>
                                    <div className='img-container'>
                                        <img src={stay.imgUrls[0]} alt="" />
                                    </div>
                                    <section className='title'>
                                        <h4>{stay.name}</h4>
                                        <div><span>Entire rental unit</span></div>
                                        {!stay.reviews.length ? "Not rated yet" : <div className='rate-title'>★ <span > {(rate / stay.reviews.length).toFixed(2)} ({stay.reviews.length} reviews)</span> </div>}
                                    </section>
                                </div>


                                <h2>Price details</h2>

                                <section className='flex space-between prices-final-tax'>
                                    <div>$ {order.stay.price} X {Math.floor(order.totalPrice / order.stay.price)}<span> nights</span> </div>
                                    <div>$ {order.stay.price * Math.floor(order.totalPrice / order.stay.price)}</div>
                                </section>

                                <section >
                                    <div className='flex space-between prices-final-tax'>Cleaning fee <span> $ {(order.stay.price * Math.floor(order.totalPrice / order.stay.price)) / 10}</span></div>

                                    {/* <span>{order.stay.price / 10}$</span> */}
                                </section>

                                {/* <section> */}
                                {/* <span>Taxes <span></span></span> */}
                                {/* <span>{order.stay.price / 10}$</span> */}
                                {/* </section> */}

                                <hr />

                                <section className='flex space-between total-price-final'>
                                    <span>Total <span>(USD)</span></span>
                                    <span>$ {order.totalPrice}</span>
                                </section>

                                {/* <hr /> */}

                                {/* <p>This property requires a $504.74 security deposit. It will be collected separately by the property prior to your arrival or at check-in.</p> */}

                            </section>

                        </section>

                    </div>
                </section>
            </section>
        </div>
    )
}