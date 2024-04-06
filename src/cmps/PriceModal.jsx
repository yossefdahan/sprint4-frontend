import { useEffect } from "react"

export function PriceModal({ priceModal, setPriceModal, stayDetails, startDate, endDate }) {


    const getDatesInRange = (startDate, endDate) => {
        const date = new Date(startDate.getTime())
        const dates = []

        while (date < endDate) {
            dates.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }

        return dates
    }


    useEffect(() => {
        function handleOutsideClick(event) {
            if (!priceModal) {
                return
            }
            if (
                !event.target.closest('.price-modal')
            ) {

                if (priceModal) setPriceModal(false)

            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [priceModal])

    const calculatePriceForDay = (date) => {
        return stayDetails.price
    }

    const datesInRange = getDatesInRange(startDate, endDate)
    const priceBreakdown = datesInRange.map((date) => ({
        date,
        price: calculatePriceForDay(date)
    }))

    const totalPrice = priceBreakdown.reduce((sum, { price }) => sum + price, 0)

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB')
    }

    const formatPrice = (price) => {
        return `$ ${price.toFixed(2)}`
    }

    return (
        <div className="price-modal">
            <button className="modal-exit-btn" onClick={() => setPriceModal(!priceModal)}>X</button>
            <h3 id="price-title">Base Price Breakdown</h3>
            <hr />
            <ul>
                {priceBreakdown.map(({ date, price }) => (
                    <li key={+date}>
                        <span>{formatDate(date)}</span>  <span>{formatPrice(price)}</span>
                    </li>
                ))}
            </ul>
            <hr />
            <div>Total Base Price <span>{formatPrice(totalPrice)}</span></div>


        </div>
    )
}