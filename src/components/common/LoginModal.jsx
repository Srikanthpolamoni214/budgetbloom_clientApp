// components/common/LoginModal.jsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const LoginModal = ({ visible, onClose }) => {
  useEffect(() => {
    // Lock scroll when modal is open
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className="login-modal-overlay" onClick={onClose}>
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()} // Prevent close on inner click
      >
        <h2>Please log in to continue</h2>
        <p>To submit a review, you need to be signed in.</p>
        <button className="login-button" onClick={() => window.location.href = '/login'}>
          Go to Login
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default LoginModal;
