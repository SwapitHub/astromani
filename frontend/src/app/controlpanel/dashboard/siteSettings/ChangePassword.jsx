import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [adminData, setAdminData] = useState(null);

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch Admin Details
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_WEBSITE_URL}/admin`
        );

        const admin = res.data[0];
        setAdminData(admin);
        setEmail(admin.email);
      } catch (err) {
        console.log("admin get api error", err);
      }
    };

    fetchAdmin();
  }, []);

  // Handle Submit
  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return setMessage("All fields are required!");
    }

    if (newPassword !== confirmPassword) {
      return setMessage("New passwords do not match!");
    }

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/admin/update-email-password/${adminData?._id}`,
        {
          email,            // editable email
          oldPassword,      // only used for verification on backend if needed
          password: newPassword, // new password for hashing
        }
      );

      if (res.status === 200) {
        setMessage("");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success("Password updated successfully!");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="change-password">
      <h1>Update Admin Details</h1>

      {/* Email Field */}
      <div className="form-field">
        <label>Email</label>
        <input
          className="common-input-filed"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Old Password */}
      <div className="form-field">
        <label>Old Password</label>
        <input
          className="common-input-filed"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>

      {/* New Password */}
      <div className="form-field">
        <label>New Password</label>
        <input
          className="common-input-filed"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      {/* Confirm Password */}
      <div className="form-field">
        <label>Confirm Password</label>
        <input
          className="common-input-filed"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

export default ChangePassword;
