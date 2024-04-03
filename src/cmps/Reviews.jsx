


export function Reviews({ reviews }) {

    return (
        <div className="review-container">
            {reviews.map(rev => {
                return (
                    <div key={rev.id}>
                        <img src={rev.by.imgUrl} alt="" />
                        <h4>{rev.by.fullname}</h4>
                        <p>{rev.rate}</p>
                        <p>{rev.txt}</p>
                    </div>
                )
            })}
            <button>Show all {reviews.length} reviews</button>
        </div >
    )

}