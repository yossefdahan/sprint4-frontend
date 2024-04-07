import React from 'react'
import { Routes, Route } from 'react-router'


import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { FinalPayment } from './pages/FinalPayment.jsx'
import { StayIndex } from './pages/StayIndex.jsx'
import { Trips } from './pages/Trips.jsx'
import { AddStay } from './pages/AddStay.jsx'

export function RootCmp() {

    return (
        <div className='main-container' >
            <AppHeader />
            <main >
                <Routes>
                    <Route path='/' element={<StayIndex />} />
                    <Route path='/:stayId' element={<StayDetails />} />
                    <Route path='/payment/:stayId' element={<FinalPayment />} />
                    <Route path='/user/:userId' element={<UserDetails />} />
                    <Route path='/user/addstay' element={<AddStay/>} />
                    <Route path='/user/trips' element={<Trips/>} />

                    {/* <Route path='' element={} /> */}
                    {/* <Route path='' element={} /> */}
                    {/* <Route path='' element={} /> */}
                    {/* <Route path='' element={} /> */}

                </Routes>
            </main>
        </div>
    )
}


