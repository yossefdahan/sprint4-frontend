import { set } from 'date-fns'
import { useState, useEffect } from 'react'
import { addOrder, getActionAddOrder } from '../store/order.actions.js'


export function PaymentRequest({ guests, order, stay, isOpen, setOpen }) {
    const { adults, children, infants, pets } = guests
    const rate = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
    const [send, setSend] = useState(false)
    function dealMade(ev) {
        ev.preventDefault()
        addOrder(order)
        // setOpen(false)
        setSend(true)

        // navigate('/')
        console.log('complete!')
    }

    function backHome() {
        window.location.href = '/'
    }

    return (
        <section className='background-opacity'>
            <div open className='payment-confrim-modal'>
                <section className='last-order'>
                    <div className='rare-to-find'>
                        <h2>{send ? 'Reservation succcess!' : 'One last step'}</h2>
                        <section className='flex column'>
                            <span>{send ? '' : 'Dear Guest'}</span>
                            <span>{send ? '' : 'In order to complete your reservation , please confrim your trip details'}</span>
                        </section>
                    </div>
                    <section>
                        <h3> Your Trip</h3>
                        <section className='flex space-between'>
                            <span>Check-In</span>
                            <span>{order.startDate}</span>
                        </section>
                        <section className='flex space-between'>
                            <span>Check-Out</span>
                            <span>{order.endDate}</span>
                        </section>
                        <section className='flex space-between'>
                            <span>Host name:</span>
                            <span>{stay.host.fullname}</span>
                        </section>
                    </section>

                </section>
                <section className='paymentModal-end' >
                    <div className='finishOrder-end'>
                        <section className='title-container'>
                            <section >
                                <hr />
                                <div className='flex column'>
                                    <h3>stay details:</h3>
                                    <section className='flex'>
                                        <img src={stay.imgUrls[0]} alt="" />
                                        <section className='title'>
                                            <h4>{stay.name}</h4>
                                            <span>Entire rental unit</span>
                                            <section className='rate-title'>
                                            </section>
                                            <span>★{rate / stay.reviews.length}({stay.reviews.length} reviews)</span>
                                        </section>
                                    </section>

                                </div>
                                <hr />
                                <h2>Price details</h2>
                                <section className='flex space-between'>
                                    <span>{order.stay.price} X {Math.floor(order.totalPrice / order.stay.price)} nights </span>
                                    <span>{order.stay.price * Math.floor(order.totalPrice / order.stay.price)}$</span>
                                </section >
                                <section className='flex space-between'>
                                    <span>Guests</span>
                                    <span> {adults + children + infants + pets} </span>
                                </section>
                                <section className='flex space-between'>
                                    <span>Cleaning fee </span>
                                    <span>{(order.stay.price * Math.floor(order.totalPrice / order.stay.price)) / 10}$</span>
                                </section>
                                <section>

                                </section>
                                <hr />
                                <section className='flex space-between'>
                                    <h3>total(USD) </h3>
                                    <span> {order.totalPrice}$</span>
                                </section>

                            </section>

                        </section>

                    </div>
                </section>
                <section>
                    {send ? (<button on onClick={() => backHome()}>Look for more places to stay</button>) : (<section className='flex space-between'>
                        <button onClick={() => setOpen(!isOpen)}>close</button>
                        <button onClick={dealMade}>Approve</button>
                    </section>)}
                </section>


            </div>
        </section>
    )
}