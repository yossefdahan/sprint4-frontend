export function ModalFromMap({ isOpen, onClose, content, position }) {
    if (!isOpen) return null
    const modalStyle = {
        position: 'absolute',
        top: `${position.top - 200}px`,
        left: `${position.left + 150}px`,
        transform: 'translate(-50%, 40%)',
        width: "400px",
        padding: "20px"
    }
    return (
        <div className="stay-modal-map" onClick={onClose}>
            <div className="modal-content" style={modalStyle} onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                {content}
            </div>
        </div>
    )
}
