import { orderService } from "../services/order.service.js"

export const SET_ORDERS = 'SET_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const SET_ORDER = 'SET_ORDER'



const initialState = {
  orders: [],
  order: orderService.getOrderPending()

}

export function orderReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.orders }
    case ADD_ORDER:
      return { ...state, orders: [...state.orders, action.order] }
    case REMOVE_ORDER:
      return { ...state, orders: state.orders.filter(order => order._id !== action.orderId) }
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map(order =>
          order._id === action.order._id ? action.order : order
        )
      }

    case SET_ORDER:
      return { ...state, order: action.order }

    default:
      return state
  }
}
