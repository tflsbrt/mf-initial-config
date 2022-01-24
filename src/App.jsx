import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import DialogModal from './components/DialogModal';

import './styles/global.scss';

export function App() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleConfirm = () => {
    setShow(false);
    alert('Yes, it does');
  };

  return (
    <div className="main-page">
      <Button variant="warning" onClick={handleShow}>
        Open Modal
      </Button>

      <DialogModal
        title="Title"
        message="Does the message sound clear?"
        isOpen={show}
        onSubmit={() => handleConfirm()}
        onClose={() => setShow(false)}
      />
    </div>
  );
}
