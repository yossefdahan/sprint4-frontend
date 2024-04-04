
import Avatar from '@mui/material/Avatar';


export function Reviews({ reviews }) {

    return (
        <div className="review-container">
            <section className='guest-lover'>
            <h1>guest something</h1>
            </section>
            <hr />
            <section className='review-by flex'>
                {reviews.map(rev => {
                    return (
                        <div className='review-by-user' key={rev.id}>
                            <section className='by-details'>
                                <Avatar alt="Travis Howard" src={rev.by.imgUrl} />
                                <section className='name-user flex column'>
                                <h4>{rev.by.fullname}</h4>
                                <span>italy</span>
                                </section>
                            </section>
                            <p>{rev.rate}</p>
                            <section className='comment'>
                                <p>{rev.txt}</p>
                            </section>
                        </div>
                    )
                })}
            </section>
            <button>Show all {reviews.length} reviews</button>
        </div >
    )

}