import { useEffect } from "react";


export function FeeModal({ feeModal, setFeeModal }) {


    useEffect(() => {
        function handleOutsideClick(event) {
            if (!feeModal) {
                return
            }
            if (


                !event.target.closest('.fee-modal')
            ) {

                if (feeModal) setFeeModal(false)

            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [feeModal])

    return (
        <div className="fee-modal">
            <button onClick={() => setFeeModal(!feeModal)}>X</button>
            <p>This helps us run our platform and offer services like 24/7 support on your trip.</p>
        </div>
    )
}