import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, addToCart } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stayService } from '../services/stay.service.js'
import { StayDetails } from './StayDetails.jsx'
import { StayList } from '../cmps/StayList.jsx'
import { Link, useSearchParams } from 'react-router-dom'
import { ScrollingFilter } from '../cmps/ScrollingFilter.jsx'
import { AppFooter } from '../cmps/AppFooter.jsx'

import { GoogleMapList } from '../cmps/GoogleMapList.jsx'
import { LoginSignup } from '../cmps/LoginSignup.jsx'
import { logout } from '../store/user.actions.js'
import { FooterPhone } from '../cmps/FooterPhone.jsx'

export function StayIndex() {
    const dispatch = useDispatch()
    const [previewMap, setPreview] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    // const [searchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(searchParams.get('country'))
    // const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const [hasMore, setHasMore] = useState(true)
    // useEffect(() => {
    // setSearchParams(filterBy, false)
    // loadStays(filterBy)
    // }, [filterBy])
    // console.log(filterBy);
    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }





    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.name = prompt('name?')
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }
    }

    async function onUpdateStay(stay) {
        const price = +prompt('New price?')
        const stayToSave = { ...stay, price }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new price: ${savedStay.price}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }
    }

    function onAddToCart(stay) {
        console.log(`Adding ${stay.name} to Cart`)
        addToCart(stay)
        showSuccessMsg('Added to Cart')
    }

    function onAddStayMsg(stay) {
        console.log(`TODO Adding msg to stay`)
        try {
            showSuccessMsg(`Stay msg added, it now has: ${3}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }

    }



    function shouldShowActionBtns(stay) {
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return stay.host?._id === user._id
    }


    if (!stays) return <div className='loader'></div>
    return (
        <>
            <ScrollingFilter stays={stays} />

            {!previewMap &&
                <StayList stays={stays}
                    onUpdateStay={onUpdateStay}
                    onRemoveStay={onRemoveStay}
                    shouldShowActionBtns={shouldShowActionBtns}
                />
            }

            {/* {isModalOpen && <LoginSignup onClose={toggleModal} />} */}

            {previewMap && <GoogleMapList stays={stays} />}
            <button className="show-map-btn" onClick={() => setPreview(!previewMap)}>
                {previewMap ? "Show list" : "Show map"} <i className={`fa-solid ${previewMap ? 'fa-list' : 'fa-map'}`}></i>
            </button>
            <FooterPhone />
        </ >

    )
}