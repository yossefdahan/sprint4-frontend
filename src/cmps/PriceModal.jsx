export function PriceModal({ priceModal, setPriceModal, stayDetails, startDate, endDate }) {


    const getDatesInRange = (startDate, endDate) => {
        const date = new Date(startDate.getTime())
        const dates = []

        while (date <= endDate) {
            dates.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }

        return dates
    }

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
        return `€ ${price.toFixed(2)}`
    }

    return (
        <div className="price-modal">
            <button onClick={() => setPriceModal(!priceModal)}>X</button>
            <h3>Base Price Breakdown</h3>

            <ul>
                {priceBreakdown.map(({ date, price }) => (
                    <li key={+date}>
                        {formatDate(date)} - {formatPrice(price)}
                    </li>
                ))}
            </ul>
            <div>Total Base Price</div>
            <div>{formatPrice(totalPrice)}</div>
        </div>
    )
}