
import Avatar from '@mui/material/Avatar';
import { utilService } from '../services/util.service';
import { useState } from 'react';


export function Reviews({ stay, reviews }) {
    const [visibleReviews, setVisibleReviews] = useState(reviews.slice(0, 6))
    const [isExpanded, setIsExpanded] = useState(false)


    const handleShowMoreReviews = () => {
        if (isExpanded) {
            setVisibleReviews(reviews.slice(0, 6))
            setIsExpanded(false)
        } else {
            setVisibleReviews(reviews)
            setIsExpanded(true)
        }
    }


    const { stars, averageRating } = utilService.getStarsWithRating(stay)
    return (
        <div className="review-container">
            {stay.reviews.length > 2 && averageRating > 4.2 && (<section className='guest-lover '>
                <div className='big-review-img'> <img src="/img/reviews.png" alt="" /></div>
                <div>
                    <div><h2>Guest favorite</h2></div>
                    <div><p className='user-line-description'>One of the most loved homes on Airbnb based <br /> on ratings, reviews, and reliability</p></div>
                </div>
            </section>)}

            <div className='review-by flex'>
                {visibleReviews.map(rev => {
                    return (
                        <div className='review-by-user' key={rev.id}>
                            <section className='by-details'>
                                <Avatar alt="A" src={rev.by.imgUrl} />
                                <section className='name-user flex column'>
                                    <h4 className='user-name-review'>{rev.by.fullname}</h4>
                                    <span>Italy , Rome</span>
                                </section>
                            </section>
                            <p> {stars}  <span>• 3 weeks ago</span></p>
                            {/* <p>{rev.rate} </p> */}
                            <section className='comment'>
                                <p>{rev.txt.length > 150 ? rev.txt.slice(0, 147) + '...' : rev.txt}</p>
                                {rev.txt.length > 150 ? (
                                    <>
                                        <span className="text-show-more">show more</span>
                                        <span>{'>'}</span>
                                    </>
                                ) : (
                                    <span></span>
                                )}
                            </section>
                        </div>
                    )
                })}
            </div >
            {visibleReviews.length >= 5 && <button className="review-btn-details" onClick={handleShowMoreReviews}> {isExpanded ? 'Show less' : `Show all ${reviews.length} reviews`}</button>}
        </div >
    )

}