import { Link, NavLink, useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import logoImg from '../assets/Img/logo.png'
import israelImg from '../assets/Img/israel.jpg'
import { WhereFilter } from './WhereFilter.jsx'
import { loadStays, setFilterBy } from '../store/stay.actions'
// import { SearchFilter } from './SearchFilter.jsx'
import { stayService } from '../services/stay.service.local.js'
import { MinFilter } from './MinFilter.jsx'



export function AppHeader() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [showSearchContainer, setShowSearchContainer] = useState(true)
    const [miniClicked, setMiniClicked] = useState(false)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const navigate = useNavigate()


    // const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [isNavVisible, setIsNavVisible] = useState(false)



    useEffect(() => {
        setSearchParams({
            ...filterBy,
            checkIn: filterBy.checkIn ? filterBy.checkIn.getTime() : '',
            checkOut: filterBy.checkOut ? filterBy.checkOut.getTime() : ''
        })
        loadStays(filterBy)
    }, [filterBy])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset
            setShowSearchContainer(currentScrollPos < 10)
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])


    const toggleNavBar = () => {
        setIsNavVisible(!isNavVisible)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function backHome() {
        window.location.href = '/'
    }
    const isPaymentRoute = location.pathname.startsWith('/payment/')
    const isHouseRoute = location.pathname.startsWith('/:stayId')
    return (<section className='main-main-header'>
        <header className="app-header flex align-center ">
            <img onClick={backHome} className="logo-img" src={logoImg} />

            {!isHouseRoute && !isPaymentRoute && showSearchContainer && (
                <div className='stays-search  flex align-center'>
                    <button className='stays'>Stays</button>
                    <button className='experiences'>Experiences</button>
                    <button className='experiences'>Online Experiences</button>
                </div>)}

            <div className='left-section-header flex align-center'>
                <button onClick={() => navigate('/user/AddStay')} className='host-your-home-nav'>Airstay you home</button>
                <button className='Languages-btn fa-solid fa-globe'></button>
                <div className='side-nav flex align-center' onClick={toggleNavBar}>
                    <button className='side-nav-bar'><i className="fa-solid fa-bars" onClick={toggleNavBar}></i></button>
                    {isNavVisible && (
                        <nav className="nav-links">

                            <NavLink className=" nav-icon-massages " to="/">Messages</NavLink>
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
        <div className='search-container'>
            {!isHouseRoute && !isPaymentRoute && showSearchContainer && <WhereFilter filterBy={filterBy} onSetFilter={onSetFilter} />}
        </div>


        {!showSearchContainer && !isHouseRoute && (
            <div className='min-filter'>
                <MinFilter miniClicked={miniClicked} setMiniClicked={setMiniClicked} />
            </div>
        )}
    </section>
    )
}