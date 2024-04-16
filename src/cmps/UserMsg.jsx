import { eventBus, showSuccessMsg } from "../services/event-bus.service.js"
import { useState, useEffect, useRef } from 'react'
import { socketService, SOCKET_EVENT_ORDER_STATUS, SOCKET_EVENT_ORDER_Update } from "../services/socket.service.js"

export function UserMsg() {

  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef(null)

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })

    // socketService.on('order-update', (msg) => {
    //   showSuccessMsg(msg)
    // })
    socketService.on('order-status', (msg) => {
      showSuccessMsg('status change')
    })

    return () => {
      unsubscribe()
      socketService.off('order-status')
      // socketService.off('order-update')
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type}`}>
      <button onClick={closeMsg}>x</button>
      {msg.txt}
    </section>
  )
}