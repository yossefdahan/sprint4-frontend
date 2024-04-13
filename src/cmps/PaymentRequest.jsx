import { set } from 'date-fns'
import { useState, useEffect } from 'react'
import { addOrder, getActionAddOrder } from '../store/order.actions.js'
import Swal from 'sweetalert2';


export function PaymentRequest({ guests, order, stay, isOpen, setOpen }) {
    const { adults, children, infants, pets } = guests
    const rate = stay.reviews.reduce((acc, review) => acc + review.rate, 0)
    const [send, setSend] = useState(false)
    const [buttonColor, setButtonColor] = useState('hsl(351, 83%, 50%)');


    const handleMouseMove = (event) => {
        const { clientY, target } = event;
        const { top, height } = target.getBoundingClientRect();
        const yRatio = (clientY - top) / height;

        const lightness = 40 + (20 * yRatio);
        setButtonColor(`hsl(351, 83%, ${lightness}%)`);
    };

    // async function dealMade(ev) {
    //     ev.preventDefault();

    //     try {
    //         await addOrder(order);
    //         setSend(true);

    //         Swal.fire({
    //             position: "center center",
    //             icon: "success",
    //             title: "Your work has been saved",
    //             showConfirmButton: false,
    //             timer: 1500
    //         });
    //         console.log('Order complete!');
    //         setTimeout(() => {
    //             toUserTrips();
    //         }, 1500);
    //     } catch (err) {
    //         console.error(err);

    //         Swal.fire({
    //             title: 'Error!',
    //             text: 'Something went wrong with your reservation.',
    //             icon: 'error',
    //         });
    //     }
    // }

    async function dealMade(ev) {
        ev.preventDefault();

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You one step away from your vacation! ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ff385c',
            confirmButtonText: 'Yes, confirm it!',
            didClose: () => {
                document.body.style.overflow = '';
            }
        });

        if (result.isConfirmed) {
            try {
                await addOrder(order);
                setSend(true);
                Swal.fire({

                    position: 'center',
                    icon: 'success',
                    title: 'Reservation sent to confirmation',
                    text: 'Host will respond within 24 hours ',
                    showConfirmButton: false,
                    backdrop: false,
                    widthAuto: false,


                    timer: 3000,

                });
                console.log('complete!');
                setTimeout(() => {
                    toUserTrips();
                }, 3000);
            } catch (err) {
                console.error(err);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong with your reservation.',
                    icon: 'error',

                });
            }
        }

    }

    function toUserTrips() {
        window.location.href = '/user/trips'
    }

    function formatDateRange(startDateStr) {
        const startDate = new Date(startDateStr)
        // const endDate = new Date(endDateStr)
        const options = { month: 'short', day: 'numeric' }
        const formattedStartDate = startDate.toLocaleDateString('en-US', options)
        // const formattedEndDate = endDate.toLocaleDateString('en-US', options)
        return `${formattedStartDate}`
    }

    return (
        <section className='background-opacity flex'>

            <div open className='payment-confrim-modal flex '>
                <section className='left-payment-modal-section'>
                    <h2>One last step</h2>
                    <section className=' summery-payment-modal flex column'>
                        <span>Dear Guest</span>
                        <span className='p-summery-payment'>{'In order to complete your reservation , please confirm your trip details'}</span>
                    </section>

                    <h3 className='stay-details-title-payment-modal'>Stay details:</h3>
                    <section className=' stay-details-section-payment-modal flex img-cont'>
                        <img src={stay.imgUrls[0]} alt="" />
                        <section className='title'>
                            <h4>{stay.name}</h4>
                            <span>Entire rental unit</span>
                            <section className='rate-title'>
                            </section>
                            <span>★ {(rate / stay.reviews.length).toFixed(2)} ({stay.reviews.length} reviews)</span>
                        </section>
                    </section>

                    <section className="first-payment-modal-section column ">
                        <h3> Your Trip</h3>
                        <section className='flex space-between'>
                            <span>Host name:</span>
                            <span>{stay.host.fullname}</span>
                        </section>

                        <section className='flex space-between'>
                            <span>Check-In</span>
                            <span>{formatDateRange(order.startDate)}</span>
                        </section>

                        <section className='flex space-between'>
                            <span>Check-Out</span>
                            <span>{formatDateRange(order.endDate)}</span>
                        </section>
                    </section>

                </section>

                <section className='title-container'>
                    <div className="second-section-payment-modal">
                        <h3>Price details</h3>
                        <section className='flex space-between'>
                            <span>$ {order.stay.price} X {Math.floor(order.totalPrice / order.stay.price)} nights </span>
                            <span>$ {order.stay.price * Math.floor(order.totalPrice / order.stay.price)}</span>
                        </section >
                        <section className='flex space-between'>
                            <span>Guests</span>
                            <span> {adults + children + infants + pets} </span>
                        </section>
                        <section className='flex space-between'>
                            <span>Cleaning fee </span>
                            <span>$ {(order.stay.price * Math.floor(order.totalPrice / order.stay.price)) / 10}</span>
                        </section>
                        <section>

                        </section>
                        <hr />
                        <section className='flex space-between'>
                            <h3>Total (USD) </h3>
                            <span>$ {order.totalPrice}</span>
                        </section>
                        <section className='flex space-between close-confirm-btn'>
                            <button className='close-btn-payment' onMouseMove={handleMouseMove} onMouseOut={() => setButtonColor('#ff385c')} onClick={() => setOpen(!isOpen)}>Close</button>
                            <button className="confirm-btn-payment" onMouseMove={handleMouseMove} onMouseOut={() => setButtonColor('#ff385c')} onClick={dealMade}>Confirm</button>
                        </section>


                    </div>

                </section>
            </div >

        </section >
    )
}