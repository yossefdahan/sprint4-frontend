import { Link, NavLink, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import logoImg from '../assets/Img/logo.png'
import logoBlack from '../assets/Img/logo-black.png'
import israelImg from '../assets/Img/israel.jpg'
import { WhereFilter } from './WhereFilter.jsx'
import { loadStays, setFilterBy } from '../store/stay.actions'
// import { SearchFilter } from './SearchFilter.jsx'
import { stayService } from '../services/stay.service.js'
import { MinFilter } from './MinFilter.jsx'


import { loadUser, loadUsers, logout } from '../store/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { AddStayPreview } from '../pages/AddStayPreview.jsx'


export function AppHeader({ showSearch, setShowSearch }) {
    const [searchParams, setSearchParams] = useSearchParams()
    // const [showSearchContainer, setShowSearchContainer] = useState(true)
    const [miniClicked, setMiniClicked] = useState(false)
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const user = useSelector(storeState => storeState.userModule.user)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const navigate = useNavigate()
    const location = useLocation()
    // const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [isNavVisible, setIsNavVisible] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleModal = () => setIsModalOpen(!isModalOpen)
    // const [user, setUser] = useState([])
    useEffect(() => {
        setSearchParams({
            ...filterBy,
            checkIn: filterBy.checkIn ? filterBy.checkIn.getTime() : '',
            checkOut: filterBy.checkOut ? filterBy.checkOut.getTime() : ''
        }, { replace: true })

        loadStays(filterBy)
    }, [filterBy])

    const isUserAHost = stays.some(stay => stay.host._id === user?._id)
    useEffect(() => {
        // loadUsers()
    }, [user])

    // async function loadUsers() {
    //     const users = await userService.getUsers()
    //     setUsers(users)
    // }
    // async function loadUser() {
    //     const user = await userService.getUsers()
    //     setUser(user)
    // }


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
    const stayyourhome = location.pathname.startsWith('/AddStayPreview')

    if (isPaymentRoute) return <header className="app-header-payment">
        <img onClick={backHome} className="logo-img logo-img-payment" src={logoImg} />

    </header>
    if (stayyourhome) return <header className="app-header-addstay flex space-between align-center">
        <img onClick={backHome} className="logo-img logo-img-payment" src={logoBlack} />
        <button onClick={backHome} className='go-back-addstay' > Exit without saving</button>
    </header>



    return !detailsRout && !isPaymentRoute ? (<header className="app-header" style={!showSearch ? { height: "80px", transition: "0.5s" } : { transition: "0.5s" }}>
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

        {isPaymentRoute ? '' : (<div className='left-section-header flex align-center'>
            {/* <button onClick={() => navigate('/user/AddStay')} className='host-your-home-nav'>Airstay you home</button> */}
            <button onClick={() => navigate('/AddStayPreview')} className='host-your-home-nav'>Airstay you home</button>
            <button className='Languages-btn fa-solid fa-globe'></button>
            <div className='side-nav flex align-center' onClick={toggleNavBar}>
                <button className='side-nav-bar'><i className="fa-solid fa-bars" onClick={toggleNavBar}></i></button>
                {isNavVisible && (
                    !user ? (
                        <nav className="nav-links">
                            <button className="login-ham-btn" onClick={toggleModal}>Login</button>
                            <NavLink className=" nav-icon" to="/user/addstay">Airstay your home</NavLink>
                            <NavLink className=" nav-icon" to="/">Help center</NavLink>
                        </nav>
                    ) :
                        <nav className="nav-links">

                            <NavLink className=" nav-icon-massages " to="/">Messages</NavLink>
                            <NavLink className=" nav-icon" to="/user/trips">Trips</NavLink>
                            <NavLink className=" nav-icon-wishlist" to="/">Wishlists</NavLink>
                            <div><hr /></div>
                            <NavLink className=" nav-icon" to="/AddStayPreview">Airstay your home</NavLink>
                            {isUserAHost && <NavLink className=" nav-icon" to="/user/dashboard">Dashboard</NavLink>}
                            <NavLink className=" nav-icon" to="/">Help center</NavLink>
                            <button className='logout-btn' onClick={onLogout}>Logout</button>

                            {/* <span className='user-name-span' onClick={() => navigate(`/user/${user._id}`)}>Hello {user.fullname}</span> */}

                        </nav>
                )}
                <img className="israel-img" src={user ? user.imgUrl : 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'} />



            </div>

        </div>)}
        <div className={showSearch ? 'search-container' : 'search-container-minimized'} >
            {isPaymentRoute ? '' : <WhereFilter filterBy={filterBy} onSetFilter={onSetFilter} />}

        </div>
        {isModalOpen && <LoginSignup onClose={toggleModal} />}
    </header>


    ) : (


        <header className="app-header-details " style={showSearch ? { transition: "0.5s" } : { transition: "0.5s" }}>

            <img onClick={backHome} className="logo-img" src={logoImg} />

            {!isPaymentRoute && !showFilter ? (
                <div className={showSearch ? 'min-filter' : 'min-filter-ben'} style={{ transition: "0.5s" }} onClick={() => handleMinFilterClick()}>
                    <MinFilter />
                </div>)
                : (<div className='stays-search flex align-center'  >
                    <button className='stays'>Stays</button>
                    <button className='experiences'>Experiences</button>
                    <button className='experiences'>Online Experiences</button>
                </div>)}

            {isPaymentRoute ? '' : (<div className='left-section-header flex align-center'>
                <button onClick={() => navigate('/user/AddStay')} className='host-your-home-nav'>Airstay you home</button>
                <button className='Languages-btn fa-solid fa-globe'></button>
                <div className='side-nav flex align-center' onClick={toggleNavBar}>
                    <button className='side-nav-bar'><i className="fa-solid fa-bars" onClick={toggleNavBar}></i></button>
                    {isNavVisible && (
                        !user ? (
                            <nav className="nav-links">
                                <button className="login-ham-btn" onClick={toggleModal}>Login</button>
                                <NavLink className=" nav-icon" to="/user/addstay">Airstay your home</NavLink>
                                <NavLink className=" nav-icon" to="/">Help center</NavLink>
                            </nav>
                        ) :
                            <nav className="nav-links">

                                <NavLink className=" nav-icon-massages " to="/">Messages</NavLink>
                                <NavLink className=" nav-icon" to="/user/trips">Trips</NavLink>
                                <NavLink className=" nav-icon-wishlist" to="/">Wishlists</NavLink>
                                <div><hr /></div>
                                <NavLink className=" nav-icon" to="/user/addstay">Airstay your home</NavLink>
                                <NavLink className=" nav-icon" to="/">Account</NavLink>
                                <NavLink className=" nav-icon" to="/">Help center</NavLink>
                                <button className='logout-btn' onClick={onLogout}>Logout</button>

                                {/* <span className='user-name-span' onClick={() => navigate(`/user/${user._id}`)}>Hello {user.fullname}</span> */}
                            </nav>
                    )}
                    <img className="israel-img" src={user ? user.imgUrl : 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'} />



                </div>

            </div>)}
            <div className={showFilter ? 'search-container-details' : 'search-container-minimized-details'}>
                {isPaymentRoute ? '' : <WhereFilter filterBy={filterBy} onSetFilter={onSetFilter} />}

            </div>


            {isModalOpen && <LoginSignup onClose={toggleModal} />}

        </header>


    )
}