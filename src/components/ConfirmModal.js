import React from 'react';
import './ConfirmModal.css'; // Make sure to create and import the CSS for the modal

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>ARE YOU SURE?</h2>
        <p>You will not be able to undo this action if you proceed!</p>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">Cancel</button>
          <button onClick={onConfirm} className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
