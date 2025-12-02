import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useDebounce from "@/app/hook/useDebounce";
import Loader from "@/app/component/Loader";
import ViewUserRecharge from "./ViewUserRecharge";

const UserRechargeList = () => {
  const [userMainData, setUserMainData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [viewUserDetails, setViewUserDetails] = useState(null);
  const [viewProductStatus, setViewProductStatus] = useState(false);

  // Pagination & search API call
  const fetchUsers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/user-recharge-payment-history?page=${pageNumber}&limit=5&search=${debouncedSearch}`
      );
      console.log(res, "=====");

      setUserMainData(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setHasNextPage(res.data.hasNextPage);
      setHasPrevPage(res.data.hasPrevPage);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on page or search change
  useEffect(() => {
    fetchUsers(page);
  }, [page, debouncedSearch]);

  return (
    <>
      {viewProductStatus && (
        <ViewUserRecharge
          viewUserDetails={viewUserDetails}
          setViewProductStatus={setViewProductStatus}
        />
      )}
      <div className="user-recharge-list">
        <h1>User Recharge List</h1>

        {/* Search Input */}
        <div className="search-box-top-btn">
          <div className="search-box-filed">
            <input
              type="search"
              placeholder="Search name or mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="search-button-filed">
            <button>
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Loader */}
        {loading ? (
          <Loader />
        ) : (
          <table border="1" className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Total Amount</th>
                <th>Payment History</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userMainData?.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No users found
                  </td>
                </tr>
              ) : (
                userMainData.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name || "-"}</td>
                    <td>{user.phone}</td>
                    <td>{user.gender || "-"}</td>
                    <td>{user.dateOfBirth || "-"}</td>
                    <td>₹{user.totalAmount || 0}</td>
                    <td>
                      {user.paymentHistory.length === 0
                        ? "No payments"
                        : user.paymentHistory.map((p) => (
                            <div key={p._id}>
                              {p.amount} {p.currency} - {p.status}
                            </div>
                          ))}
                    </td>
                    <td>
                      {/* View User */}
                      
                        <button
                          onClick={() => {
                            setViewUserDetails(user);
                            setViewProductStatus(true);
                          }}
                          className="delete-btn"
                        >
                          <MdOutlineRemoveRedEye />
                        </button>
                     
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={!hasPrevPage || loading}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={!hasNextPage || loading}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default UserRechargeList;
