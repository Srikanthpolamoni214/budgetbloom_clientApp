// src/pages/VerifyEmail.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying...");
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      axios
        .get(`https://budgetbloom-server.onrender.com/verify-email?token=${token}`) // ✅ replace with your hosted backend
        .then(() => setMessage("✅ Email verified! You can now log in."))
        .catch(() => setMessage("❌ Verification failed or expired."));
    } else {
      setMessage("❌ No token provided.");
    }
  }, [token]);

  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold">{message}</h2>
      {message.includes("verified") && (
        <a
          className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded"
          href="/login"
        >
          Go to Login
        </a>
      )}
    </div>
  );
};

export default VerifyEmail;
