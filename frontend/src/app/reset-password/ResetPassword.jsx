"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ Get reset token from URL
  const token = searchParams.get("token");

  const handleResetSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage("⚠️ Please fill in both fields.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("⚠️ Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("⚠️ Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/auth/user-reset-password`,
        { token, newPassword }
      );

      if (res.status === 200) {
        setMessage("✅ Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          router.push("/chat-with-astrologer"); 
        }, 2000);
      } else {
        setMessage(res.data.message || "❌ Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "❌ Invalid or expired link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h1>Reset Password</h1>
        <p>Enter your new password below. Password must be at least 6 characters.</p>

        <div className="form-field">
          <input
            type="password"
            placeholder="Enter new password"
            className="common-input-filed"
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="form-field">
          <input
            type="password"
            placeholder="Confirm new password"
            className="common-input-filed"
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleResetSubmit}
          disabled={loading}
          className="submit-btn"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

        {message && (
          <div
            className={`message-box ${
              message.includes("✅") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}
      </div>

      <style jsx>{`
        .reset-password-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #f4f4f4;
        }

        .reset-password-box {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        h1 {
          margin-bottom: 10px;
          color: #222;
        }

        p {
          color: #666;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .form-field {
          margin-bottom: 15px;
        }

        .common-input-filed {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
        }

        .submit-btn {
          width: 100%;
          background: #0070f3;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .message-box {
          margin-top: 15px;
          padding: 10px;
          border-radius: 5px;
        }

        .success {
          background: #d4edda;
          color: #155724;
        }

        .error {
          background: #f8d7da;
          color: #721c24;
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;
