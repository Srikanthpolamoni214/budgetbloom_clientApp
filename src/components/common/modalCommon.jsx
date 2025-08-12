// // src/components/LoginModal.jsx
// import React from 'react';
// import './modal.css';
// import { useEffect } from 'react';

// const LoginModal = ({ visible, onClose }) => {
//   useEffect(() => {
//     if (visible && window.google?.accounts?.id?.cancel) {
//       window.google.accounts.id.cancel(); // hide One Tap G badge
//     }
//   }, [visible]);

//   if (!visible) return null;

//   return (
//     <div className="login-modal-overlay"  style={{
//     margin: 0,
//     padding: 0,
//     position: 'fixed',
//     inset: 0, // shorthand for top, right, bottom, left = 0
//     zIndex: 1000,
//   }}>
//       <div className="login-modal">
//         <h2>Please log in to continue</h2>
//         <p>To submit a review, you need to be logged in.</p>

//         <div>
//           <button
//             className="login-button"
//             onClick={() => (window.location.href = '/login')}
//           >
//             Go to Login
//           </button>
//           <button className="close-button" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;




import React, { useEffect } from 'react';
import './modal.css';

const LoginModal = ({ visible, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <h2>Please log in to continue</h2>
        <p>To submit a review, you need to be logged in.</p>

        <div>
          <button
            className="login-button"
            onClick={() => (window.location.href = '/login')}
          >
            Go to Login
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
