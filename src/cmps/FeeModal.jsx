

export function FeeModal({ feeModal, setFeeModal }) {
    return (
        <div className="fee-modal">
            <button onClick={() => setFeeModal(!feeModal)}>X</button>
            <p>This helps us run our platform and offer services like 24/7 support on your trip.</p>
        </div>
    )
}