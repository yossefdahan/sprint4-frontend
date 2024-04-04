import { userService } from '../services/user.service.js'
import { useState, useEffect } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { orderService } from '../services/order.service.js'
import { stayService } from '../services/stay.service.local.js'


export function FinalPayment() {
    // const [order, setOrder] = useState(orderService)
    const navigate = useNavigate()
    const order = useSelector(storeState => storeState.orderModule.order)
    const { stayId } = useParams()
    const [stay, setStay] = useState(null)
    // console.log(order)
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
    }, [stayId])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            showErrorMsg('Cant load ')
            navigate('/')
        }
    }
    console.log(order)

    // async function onSaveReview(ev) {
    //     ev.preventDefault()

    //     try {

    //         const savedReview = await reviewService.add(order)
    //         showSuccessMsg('Review saved!')
    //     } catch (err) {
    //         console.log('error saving the review :', err)
    //     }
    // }
    if (!stay) return <div>loading...</div>
    const rate = stay.reviews.reduce((acc, review) => acc + review.rate, 0)

    return (
        <section className='payment-page'>
            <section>
                <h1>Confirm and pay</h1>
                <span><Link to={`/${stayId}`}>{'<'}</Link></span>
                <div>
                    <span>This is rare find</span>
                </div>
                <div>
                    <h2>Your trip</h2>
                    <div>
                        <h3>Dates</h3>
                        <a href="">Edit</a>
                    </div>
                    <div>
                        <h3>Guests</h3>
                        <a href="">Edit</a>
                    </div>
                </div>
                <hr />
                <div className='type-of-pay'>
                    <h2>Choose how to pay</h2>
                </div>
                <hr />
                <div>
                    payment from ui
                </div>
                <hr />
                <div>
                    <h2>Cancellation policy</h2>
                    <p>Free cancellation before Apr 27. Cancel before check-in on May 2 for a partial refund. Learn more</p>
                </div>
                <hr />
                <div>
                    <h2>Ground rules</h2>
                    <p>We ask every guest to remember a few simple things about what makes a great guest.</p>
                    <ul>
                        <li>Follow the house rules</li>
                        <li>Treat your Host’s home like your own</li>
                    </ul>
                </div>
                <hr />
                <div className='calltoAction'>
                    <p>By selecting the button below, I agree to the Host's House Rules, Ground rules for guests, Airbnb's Rebooking and Refund Policy, and that Airbnb can charge my payment method if I’m responsible for damage.</p>
                    <button>Confirm and pay</button>
                </div>



                {/* <span>{order._id}</span> */}
            </section>
            <section className='paymentModal' >
                <div className='finishOrder'>
                    <section className='title-container'>
                        <section >
                            <div className='header-pay'>
                                <img src={stay.imgUrls[0]} alt="" />
                                <section className='title'>
                                    <h4>{stay.name}</h4>
                                    <span>Entire rental unit</span>
                                    <section className='rate-title'>
                                    </section>
                                    <span>★{rate / stay.reviews.length}({stay.reviews.length} reviews)</span>
                                </section>
                            </div>
                            <hr />
                            <h2>Price details</h2>
                            <section>
                                <span>{order.stay.price}X{5}nights</span>
                                <span>{order.stay.price * 5}$</span>
                            </section>
                            <section>
                                <span>Cleaning fee</span>
                                <span>{order.stay.price / 10}$</span>
                            </section>
                            <section>
                                <span>Taxes</span>
                                <span>{order.stay.price / 10}$</span>
                            </section>
                            <hr />
                            <section>
                                <h3>total(USD)</h3>
                                <span>{order.stay.price * 5 + 2 * (order.stay.price / 10)}$</span>
                            </section>
                            <hr />
                            <p>This property requires a ₪504.74 security deposit. It will be collected separately by the property prior to your arrival or at check-in.</p>
                        </section>

                    </section>

                </div>
            </section>
        </section>
    )
}