// // src/pages/VerifyEmail.jsx
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

// const VerifyEmail = () => {
//   const [searchParams] = useSearchParams();
//   const [message, setMessage] = useState("Verifying...");
//   const token = searchParams.get("token");

//   useEffect(() => {
//     if (token) {
//       axios
//         .get(`https://budgetbloom-server.onrender.com/verify-email?token=${token}`) // ✅ replace with your hosted backend
//         .then(() => setMessage("✅ Email verified! You can now log in."))
//         .catch(() => setMessage("❌ Verification failed or expired."));
//     } else {
//       setMessage("❌ No token provided.");
//     }
//   }, [token]);

//   return (
//     <div className="p-8 text-center">
//       <h2 className="text-xl font-bold">{message}</h2>
//       {message.includes("verified") && (
//         <a
//           className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded"
//           href="/login"
//         >
//           Go to Login
//         </a>
//       )}
//     </div>
//   );
// };

// export default VerifyEmail;



// src/pages/VerifyEmail.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [status, setStatus] = useState("loading"); // loading, success, error, none
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`https://budgetbloom-server.onrender.com/verify-email?token=${token}`)
        .then(() => {
          setStatus("success");
          setMessage("✅ Email verified! You can now log in.");
          setTimeout(() => navigate("/login"), 3000); // Auto-redirect after 3s
        })
        .catch(() => {
          setStatus("error");
          setMessage("❌ Verification failed or expired.");
        });
    } else {
      setStatus("error");
      setMessage("❌ No token provided.");
    }
  }, [token, navigate]);

  return (
    <div className="p-8 text-center min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      {status === "loading" && (
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          <p className="text-lg font-semibold">Verifying your email...</p>
        </div>
      )}

      {status !== "loading" && (
        <>
          <h2 className="text-xl font-bold mb-4">{message}</h2>
          {status === "success" && (
            <a
              className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow"
              href="/login"
            >
              Go to Login
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
