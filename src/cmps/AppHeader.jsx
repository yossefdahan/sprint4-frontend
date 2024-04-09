import { Link, NavLink, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import logoImg from '../assets/Img/logo.png'
import israelImg from '../assets/Img/israel.jpg'
import { WhereFilter } from './WhereFilter.jsx'
import { loadStays, setFilterBy } from '../store/stay.actions'
// import { SearchFilter } from './SearchFilter.jsx'
import { stayService } from '../services/stay.service.local.js'
import { MinFilter } from './MinFilter.jsx'
import { positions, style } from '@mui/system'
import { height, transition } from 'dom7'



export function AppHeader({ showSearch, setShowSearch }) {
    const [searchParams, setSearchParams] = useSearchParams()
    // const [showSearchContainer, setShowSearchContainer] = useState(true)
    const [miniClicked, setMiniClicked] = useState(false)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const navigate = useNavigate()
    const location = useLocation()
    // const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [isNavVisible, setIsNavVisible] = useState(false)
    const [showFilter, setShowFilter] = useState(false)


    useEffect(() => {
        setSearchParams({
            ...filterBy,
            checkIn: filterBy.checkIn ? filterBy.checkIn.getTime() : '',
            checkOut: filterBy.checkOut ? filterBy.checkOut.getTime() : ''
        })
        loadStays(filterBy)
    }, [filterBy])

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const currentScrollPos = window.pageYOffset
    //         setShowSearchContainer(currentScrollPos < 1)
    //     }
    //     window.addEventListener('scroll', handleScroll)

    //     return () => window.removeEventListener('scroll', handleScroll)
    // }, [])

    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //         const [entry] = entries;
    //         setShowSearch(entry.isIntersecting);
    //     }, { threshold: 0.1 });

    //     const section = headerRef.current;
    //     if (section) {
    //         observer.observe(section);
    //     }

    //     return () => observer.disconnect();
    // }, []);

    const toggleNavBar = () => {
        setIsNavVisible(!isNavVisible)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function backHome() {
        window.location.href = '/'
    }

    // function getHeader() {
    //     const route = location.pathname

    //     switch (route) {
    //         case '/:stayId'
    //         return(

    //         )
    //     }
    // }

    function handleMinFilterClick() {

        setShowFilter(current => !current)
        setShowSearch(current => !current)
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        } else {
            window.scrollTo(0, 0)
        }
    }

    const isPaymentRoute = location.pathname.startsWith('/payment/')
    const detailsRout = location.pathname.startsWith('/stay')
    if (isPaymentRoute) return
    return !detailsRout ? (<header className="app-header" style={!showSearch ? { height: "80px", transition: "0.5s" } : { transition: "0.5s" }}>
        <img onClick={backHome} className="logo-img" src={logoImg} />

        {showSearch ? (
            <div className='stays-search  flex align-center' >
                <button className='stays'>Stays</button>
                <button className='experiences'>Experiences</button>
                <button className='experiences'>Online Experiences</button>
            </div>) : (
            <div className={!showSearch ? 'min-filter' : 'min-filter-ben'} style={{ transition: "0.5s" }} onClick={() => handleMinFilterClick()}>
                <MinFilter />
            </div>)}

        <div className='left-section-header flex align-center'>
            <button onClick={() => navigate('/user/AddStay')} className='host-your-home-nav'>Airstay you home</button>
            <button className='Languages-btn fa-solid fa-globe'></button>
            <div className='side-nav flex align-center' onClick={toggleNavBar}>
                <button className='side-nav-bar'><i className="fa-solid fa-bars" onClick={toggleNavBar}></i></button>
                {isNavVisible && (
                    <nav className="nav-links">

                        <NavLink className=" nav-icon-massages " to="/">Messages</NavLink>
                        <NavLink className=" nav-icon" to="/user/trips">Trips</NavLink>
                        <NavLink className=" nav-icon-wishlist" to="/">Wishlists</NavLink>
                        <div><hr /></div>
                        <NavLink className=" nav-icon" to="/user/addstay">Airstay your home</NavLink>
                        <NavLink className=" nav-icon" to="/">Account</NavLink>
                        <NavLink className=" nav-icon" to="/">Help center</NavLink>
                        <NavLink className=" nav-icon" to="/">Log out</NavLink>

                    </nav>
                )}
                <img className="israel-img" src={israelImg} />

            </div>

        </div>
        <div className={showSearch ? 'search-container' : 'search-container-minimized'} >
            <WhereFilter filterBy={filterBy} onSetFilter={onSetFilter} />

        </div>

    </header>) : (<header className="app-header-details" style={showSearch ? { transition: "0.5s" } : { transition: "0.5s" }}>

        <img onClick={backHome} className="logo-img" src={logoImg} />

        {!showFilter ? (
            <div className={showSearch ? 'min-filter' : 'min-filter-ben'} style={{ transition: "0.5s" }} onClick={() => handleMinFilterClick()}>
                <MinFilter />
            </div>)
            : (<div className='stays-search flex align-center'  >
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
                        <NavLink className=" nav-icon" to="/user/trips">Trips</NavLink>
                        <NavLink className=" nav-icon-wishlist" to="/">Wishlists</NavLink>
                        <div><hr /></div>
                        <NavLink className=" nav-icon" to="/user/addstay">Airstay your home</NavLink>
                        <NavLink className=" nav-icon" to="/">Account</NavLink>
                        <NavLink className=" nav-icon" to="/">Help center</NavLink>
                        <NavLink className=" nav-icon" to="/">Log out</NavLink>

                    </nav>
                )}
                <img className="israel-img" src={israelImg} />

            </div>

        </div>
        <div className={showFilter ? 'search-container-details' : 'search-container-minimized-details'}>
            <WhereFilter filterBy={filterBy} onSetFilter={onSetFilter} />

        </div>




    </header>



    )
}