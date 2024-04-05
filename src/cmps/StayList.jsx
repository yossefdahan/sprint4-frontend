import { StayPreview } from "./StayPreview";



export function StayList({ stays, shouldShowActionBtns, onRemoveStay, onUpdateStay }) {



    return (

        <ul className="stay-list">
            {stays.map(stay =>
                <StayPreview
                    stay={stay}
                    onUpdateStay={onUpdateStay}
                    onRemoveStay={onRemoveStay}
                    shouldShowActionBtns={shouldShowActionBtns}
                    key={stay._id}
                />)
            }

        </ul>

    )
}