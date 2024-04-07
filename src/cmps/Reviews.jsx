
import Avatar from '@mui/material/Avatar';


export function Reviews({ reviews }) {

    return (
        <div className="review-container">
            <section className='guest-lover '>
                <div className='big-review-img'> <img src="public/img/reviews.png" alt="" /></div>
                <div>
                    <div><h2>Guest favorite</h2></div>
                    <div><p className='user-line-description'>One of the most loved homes on Airbnb based <br /> on ratings, reviews, and reliability</p></div>
                </div>
            </section>
            <hr />
            <section className='review-by flex'>
                {reviews.map(rev => {
                    return (
                        <div className='review-by-user' key={rev.id}>
                            <section className='by-details'>
                                <Avatar alt="A" src={rev.by.imgUrl} />
                                <section className='name-user flex column'>
                                    <h4 className='user-name-review'>{rev.by.fullname}</h4>
                                    <span>Italy</span>
                                </section>
                            </section>
                            <p> ★★★★★  <span>• 3 weeks ago</span></p>
                            {/* <p>{rev.rate} </p> */}
                            <section className='comment'>
                                <p>{rev.txt}</p>
                            </section>
                        </div>
                    )
                })}
            </section >
            <button className="review-btn-details"> Show all {reviews.length} reviews</button>
        </div >
    )

}