import Modal from 'react-modal';

Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, onClose, label, children }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel={label}>
            <div>
                {label && <h2>{label}</h2>}
                <button onClick={onClose}>X</button>
            </div>
            {children}
        </Modal>
    )
}

export default ModalComponent;