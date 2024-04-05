import { stayService } from "../services/stay.service.local"

export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const ADD_TO_CART = 'ADD_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const UNDO_REMOVE_STAY = 'UNDO_REMOVE_STAY'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_FILTER_BY = 'SET_FILTER_BY'
// const SearchParams =

const initialState = {
    stays: [],
    cart: [],
    lastRemovedStay: null,
    filterBy: stayService.getDefaultFilter()
    // filterBy: null
}

export function stayReducer(state = initialState, action = {}) {



    switch (action.type) {
        case SET_STAYS:
            return { ...state, stays: action.stays }

        case REMOVE_STAY:
            const lastRemovedstay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            return { ...state, stays, lastRemovedstay }

        case ADD_STAY:
            return { ...state, stays: [...state.stays, action.stay] }
        case UPDATE_STAY:
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            return { ...state, stays }

        case ADD_TO_CART:
            return { ...state, cart: [...state.cart, action.stay] }

        case REMOVE_FROM_CART:
            var cart = state.cart.filter(stay => stay._id !== action.stayId)
            return { ...state, cart }

        case CLEAR_CART:
            return { ...state, cart: [] }


        case UNDO_REMOVE_STAY:
            if (state.lastRemovedStay) {
                return { ...state, stays: [...state.stays, state.lastRemovedStay], lastRemovedStay: null }
            }


        case SET_FILTER_BY: {
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy },
            }
        }

        default:
            return state
    }

}
