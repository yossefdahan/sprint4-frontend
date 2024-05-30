import { useState } from "react"
import { logout } from "../store/user.actions"
import { LoginSignup } from "./LoginSignup"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export function FooterPhone() {

    const user = useSelector(storeState => storeState.userModule.user)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleModal = () => setIsModalOpen(!isModalOpen)
    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
        navigate('/')
    }

    return (<>
        {isModalOpen && <LoginSignup onClose={toggleModal} />}

        <footer className="app-footer-trips">
            <nav className="footer-nav">
                <Link style={{ color: "red", fontWeight: "500" }} to="/" className="footer-nav-link"> <i className="fa-solid fa-magnifying-glass"></i>Explore</Link>
                {user ? (<Link to="/user/trips" className="footer-nav-link"> <i className="fa-brands fa-airbnb"></i>Trips</Link>) : ''}
                {user ? <Link to="/user/addstay" className="footer-nav-link"><i className="fa-solid fa-house-flag"></i>Add Stay </Link> : ''}
                {user ? <div onClick={() => onLogout()} className='footer-nav-link'><i className="fa-solid fa-user"></i>Logout</div> : <div onClick={toggleModal} className='footer-nav-link'><i className="fa-solid fa-user"></i>Login</div>}
                {/* <Link to="/user/dashboard" className="  footer-nav-link"> <i className="fa-solid fa-chart-line"></i>Dashboard</Link> */}
            </nav>

        </footer>
    </>
    )

}