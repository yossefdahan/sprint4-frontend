import React from 'react'
import { Routes, Route } from 'react-router'


import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { FinalPayment } from './pages/FinalPayment.jsx'
import { StayIndex } from './pages/StayIndex.jsx'

export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path='/' element={<StayIndex />} />
                    <Route path='/:stayId' element={<StayDetails />} />
                    <Route path='/payment' element={<FinalPayment />} />
                    <Route path='/user/:userId' element={<UserDetails />} />
                    {/* <Route path='' element={} /> */}
                    {/* <Route path='' element={} /> */}
                    {/* <Route path='' element={} /> */}
                    {/* <Route path='' element={} /> */}

                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


