import { userService } from '../services/user.service.js'
import { Link, useNavigate, useParams } from 'react-router-dom'

export function FinalPayment() {
    // const [order, setOrder] = useState(orderService)
    const navigate = useNavigate()
    const { stayId } = useParams()

    return <section>
        <span><Link to={`/${stayId}`}>{'<'}</Link></span>
        <h1>Confirm and pay</h1>

    </section>
}