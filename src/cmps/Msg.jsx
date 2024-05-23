import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadOrders, updateOrder, getActionAddOrder } from '../store/order.actions.js'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'


export function Msg() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [msg, setMsg] = useState({ txt: '' })
    const [userMsgs, setUserMsgs] = useState([]);


    useEffect(() => {
        loadMsgs()
    }, [loggedInUser._id])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            // botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        }
    }, [])


    function addMsg(newMsg) {
        setUserMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    async function loadMsgs() {
        try {
            await loadOrders()
            console.log(orders)
            let userOrders = orders.map((order) => order.hostId === loggedInUser._id || order.buyer._id === loggedInUser._id)
            const messages = userOrders.map(order => order.msgs)
            setUserMsgs(messages)
        } catch (err) {
            console.log('loadMsg: err in loadMsgs', err)
            throw err
        }
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }


    return (<div className="Msg-page">

        <div className="body-chat">
            <ul className="messages"></ul>
            <form className="form-msg" onSubmit={sendMsg}>
                <input className="input-msg" type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" /><button>Send</button>
            </form>
        </div>
        <div className="list-msg">
            {
                userMsgs.length === 0 ? 'no msgs yet' : userMsgs.forEach((msg, idx) => <li key={idx}></li>)
            }
        </div>
    </div>
    )
}