import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, addToCart } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stayService } from '../services/stay.service.local.js'
import { StayDetails } from './StayDetails.jsx'
import { StayList } from '../cmps/StayList.jsx'
import { useSearchParams } from 'react-router-dom'
import { ScrollingFilter } from '../cmps/ScrollingFilter.jsx'
import { AppFooter } from '../cmps/AppFooter.jsx'

export function StayIndex() {
    const dispatch = useDispatch()
    // const [searchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(searchParams.get('country'))
    // const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const stays = useSelector(storeState => storeState.stayModule.stays)

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

    if (!stays) return <div className='loader'></div>

    function shouldShowActionBtns(stay) {
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return stay.host?._id === user._id
    }

    return (
        <section>
            <ScrollingFilter stays={stays} />
            <StayList stays={stays}
                onUpdateStay={onUpdateStay}
                onRemoveStay={onRemoveStay}
                shouldShowActionBtns={shouldShowActionBtns}
            />
            <button className="show-map-btn">Show map <i className="fa-solid fa-map"></i></button>
            {/* <AppFooter /> */}
        </section>
    )
}