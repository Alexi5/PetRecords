import Modal from 'react-modal';
import './styles/Modal.css';

Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, onClose, label, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={label}
            overlayClassName="modal-overlay"
            className="modal-content"
        >
            <div className="modal-header">
                {label && <h2>{label}</h2>}
                <button onClick={onClose}>X</button>
            </div>
            <div className="modal-body">
                {children}
            </div>
        </Modal>
    )
}

export default ModalComponent;