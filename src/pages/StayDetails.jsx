import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from "react"
// import { useParams } from 'react-router-dom'
import { userService } from '../services/user.service.js'
import { setFilterBy } from '../store/stay.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.local.js'
import { MainDetails } from '../cmps/MainDetails.jsx'
import { GoogleMap } from '../cmps/GoogleMap.jsx'
import { Reviews } from '../cmps/Reviews.jsx'
import { Payment } from '../cmps/payment.jsx'



export function StayDetails() {
    const { stayId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    // const filterBy = stayService.getFilterFromParams(searchParams)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [stay, setStay] = useState(null)
    const navigate = useNavigate()
    const users = useSelector(storeState => storeState.userModule.users)

    // const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    useEffect(() => {

        setSearchParams(filterBy)
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

    // const imgs =stay.imgUrls.slice(0,4)// use it in the future
    if (!stay) return <div>yosef we have proble!</div>
    return (
        <section className='details-layout'>
            <h1 className='stay-name-details'>{stay.name}</h1>
            <section className='gallery'>
                {stay.imgUrls.map((img) =>
                    <img src={img} alt="img of the photo" key={img} />
                )
                }
            </section>
            <section className='main-details'>
                <MainDetails stay={stay} filterBy={filterBy} onSetFilter={setFilterBy} />
                <Payment stay={stay} filterBy={filterBy} onSetFilter={setFilterBy} />

            </section>
            <div className="details-reviews">
                <hr />
                <Reviews reviews={stay.reviews} />
            </div>
            <div className="google-map-details">
                <hr />
                <GoogleMap stay={stay} />
            </div>
        </section>
    )


}