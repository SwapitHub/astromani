"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import Loader from "../component/Loader";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";

const Admin = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const adminSegment = segments[0];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const admin_id = Cookies.get("admin_id");

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (adminSegment === "controlpanel" && admin_id) {
      router.push("/controlpanel/dashboard");
    }
  }, [adminSegment, admin_id, router]);

  const handleSubmit = async () => {
    if (!email || !password) return setError("Please enter email and password");
    // setIsLoading(true); // Start loader
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/admin`
      );
      if (!response.ok) throw new Error("Failed to fetch admin data");

      const admins = await response.json();
      const admin = admins[0];
      // Compare plain text password with hashed password
      if (!admin) {
        setError("Admin not found");
        return;
      }

      // Compare plain text password with hashed password
      const isMatch = await bcrypt.compare(password, admin.password);
console.log(admin?.email , email ,isMatch, admin.password);

      if (admin?.email === email && isMatch) {
        setIsLoading(true); // Start loader
        secureLocalStorage.setItem("admin_id", admin._id);
        Cookies.set("admin_id", admin._id);
        router.push("/controlpanel/dashboard");
        window.dispatchEvent(new Event("admin_id_updated"));
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    }
    // finally {
    //   setIsLoading(false); // Stop loader
    // }
  };

  return (
    <div className="container">
      <div className="admin-popup-main">
        {isLoading && <Loader />}
        <div className="admin-popup-outer-inner">
          <div className="admin-detail-popup">
            <div className="admin-banner">
              <div className="admin-login-logo">
                <img src="/logo-main.png" alt="" />
              </div>
              <div className="admin-login-left-content">
                <h1>Welcome to Astromani</h1>
                <p>Lorem Ipsum content here</p>
              </div>
            </div>
            <div className="admin-text admin-login-form">
              <div className="form-field">
                <label>Admin Email</label>
                <input
                  className="common-input-filed"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Admin Password</label>
                <input
                  className="common-input-filed"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
