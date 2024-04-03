import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.local.js'
import { MainDetails } from '../cmps/MainDetails.jsx'


export function StayDetails() {
    const { stayId } = useParams()
    const [stay, setStay] = useState(null)
    const navigate = useNavigate()
    const users = useSelector(storeState => storeState.userModule.users)


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



    if (!stay) return <div>yosef we have proble!</div>
    return (
        <section>
            <h1>{stay.name}</h1>
            <section className='gallery'>
                {stay.imgUrls.map((img) => {
                    <img src={img} alt="img of the photo" />
                })
                }
            </section>
            <section className='main-details'>
            <MainDetails stay={stay} />
            </section>
        </section>
    )


}