import React, { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router'


import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { FinalPayment } from './pages/FinalPayment.jsx'
import { StayIndex } from './pages/StayIndex.jsx'
import { Trips } from './pages/Trips.jsx'
import { DashBoard } from './pages/DashBoard.jsx'
import { AddStay } from './pages/AddStay.jsx'

export function RootCmp() {

    const headerRef = useRef()
    const [showSearch, setShowSearch] = useState(true)


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            setShowSearch(entry.isIntersecting);
        }, { threshold: 1 });

        const section = headerRef.current;
        if (section) {
            observer.observe(section);
        }

        return () => observer.disconnect();
    }, [showSearch]);



    return (
        <div className='main-container' >
            <section ref={headerRef} style={{ padding: "5px" }}></section>
            <AppHeader showSearch={showSearch} setShowSearch={setShowSearch} />
            {/* <border style={{ borderBottom: '1px solid lightgray', gridColumn: '1 / -1' }}></border> */}
            <>
                <Routes>
                    <Route path='/' element={<StayIndex />} />
                    <Route path='/stay/:stayId' element={<StayDetails />} />
                    <Route path='/payment/:stayId' element={<FinalPayment />} />
                    <Route path='/user/:userId' element={<UserDetails />} />
                    <Route path='/user/addstay' element={<AddStay />} />
                    <Route path='/user/trips' element={<Trips />} />
                    <Route path='/user/dashboard' element={<DashBoard />} />
                </Routes>
            </>
        </div >
    )
}


