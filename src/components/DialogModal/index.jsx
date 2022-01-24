import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DialogModal = ({ title, message, isOpen, onSubmit, onClose }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DialogModal;
