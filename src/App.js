import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import DialogModal from './components/DialogModal';

import './styles/global.scss';

const ClientApp = React.lazy(() => import('client/App'));

export default function App() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleConfirm = () => {
    setShow(false);
    alert('Yes, it does');
  };

  return (
    <>
      <React.Suspense fallback="Loading...">
        <ClientApp />
      </React.Suspense>

      <div className="host-main-page">
        <h1>Host App</h1>
        <Button variant="danger" onClick={handleShow}>
          Open Modal
        </Button>

        <DialogModal
          title="Title"
          message="Does the message sound clear?"
          isOpen={show}
          onSubmit={handleConfirm}
          onClose={handleClose}
        />
      </div>
    </>
  );
}
