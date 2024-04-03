import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import logoImg from '../assets/Img/logo.png'
import israelImg from '../assets/Img/israel.jpg'


export function AppHeader() {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const toggleNavBar = () => {
        setIsNavVisible(!isNavVisible);
    };

    return (
        <header className="app-header flex align-center ">
            <Link to="/"><img className="logo-img" src={logoImg} /></Link>
            <div className='stays-search  flex align-center'>
                <button className='stays'>Stays</button>
                <button className='experiences'>Experiences</button>
            </div>
            <div className='left-section-header flex align-center'>
                <button className='host-your-home-nav'>Airstay you home</button>
                <button className='Languages-btn fa-solid fa-globe'></button>
                <div className='side-nav flex align-center' onClick={toggleNavBar}>
                    <button className='side-nav-bar'><i className="fa-solid fa-bars" onClick={toggleNavBar}></i></button>
                    {isNavVisible && (
                        <nav className="nav-links">
                            <NavLink className=" nav-icon " to="/">Messages</NavLink>
                            <NavLink className=" nav-icon" to="/">Trips</NavLink>
                            <NavLink className=" nav-icon-wishlist" to="/">Wishlists</NavLink>
                            <div><hr /></div>
                            <NavLink className=" nav-icon" to="/">Airstay your home</NavLink>
                            <NavLink className=" nav-icon" to="/">Account</NavLink>
                            <NavLink className=" nav-icon" to="/">Help center</NavLink>
                            <NavLink className=" nav-icon" to="/">Log out</NavLink>

                        </nav>
                    )}
                    <img className="israel-img" src={israelImg} />

                </div>

            </div>

        </header>
    )
}