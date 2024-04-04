import { legacy_createStore as createStore, combineReducers } from 'redux'

import { stayReducer } from './stay.reducer.js'
import { userReducer } from './user.reducer.js'
import { orderReducer } from './order.reducer'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    stayModule: stayReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    orderModule: orderReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })



