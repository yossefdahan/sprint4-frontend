import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import logoImg from '../assets/Img/logo.png'


export function AppHeader() {



    return (
        <header className="app-header flex space between">
            <img className="logo-img" src={logoImg} />
            <div className='stays-search'>
                <h2>Stays</h2>
                <h2>Experiences</h2>
            </div>
            <div>
                <h2>Airstay you home</h2>
                <h2><i className="fa-solid fa-globe"></i></h2>
            </div>
            <button><i class="fa-solid fa-bars"></i></button>
        </header>
    )
}