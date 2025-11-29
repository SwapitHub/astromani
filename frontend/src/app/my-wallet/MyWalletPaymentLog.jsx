"use client";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MyWalletPaymentLog = ({ userPhoneRecharge }) => {
  const [userData, setUserData] = useState([]);
  const [userPhone, setUserPhone] = useState();
  console.log(userPhoneRecharge);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get user mobile from cookie
  useEffect(() => {
    const mobile = Cookies.get("userMobile");
    setUserPhone(mobile ? Number(mobile) : "");
  }, []);

  // Fetch paginated data
  useEffect(() => {
    const fetchOrderUserList = async () => {
      if (userPhone || userPhoneRecharge) {
        setLoading(true);

        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_WEBSITE_URL}/create-order-user-list/${
              userPhone ? userPhone : userPhoneRecharge
            }?page=${page}&limit=5`
          );

          console.log(response);

          setUserData(response.data.data || []);
          setTotalPages(response.data.pagination.totalPages);
          setHasNextPage(response.data.pagination.nextPage !== null);
          setHasPrevPage(response.data.pagination.prevPage !== null);
        } catch (error) {
          console.log("Error login detail api", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("userPhone || userPhoneRecharge error");

        return;
      }
    };
    fetchOrderUserList();
  }, [userPhone, page]);

  return (
    <div className="wallet-ctm-tab wallet-ctm-tab-active">
      <div className="my-wallet-sec-heading-content">
        <h1 className="common-h1-heading">Transactions</h1>
      </div>

      <div className="my-wallet-table-sec outer-table">
        <table>
          <thead>
            <tr>
              <th>Recharge</th>
              <th>Datetime</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {userData?.map((item, index) => (
              <tr key={index}>
                <td>Recharge</td>
                <td>{new Date(item?.createdAt).toLocaleString()}</td>
                <td>₹ {item?.amount}</td>
                <td>{item?.order_id}</td>
                <td>{item?.status}</td>
                <td className="delete-button-icon">
                  <a href="#" title="Remove">
                    <i className="fa-solid fa-trash"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <p>Loading...</p>}
      </div>

      {/* Pagination */}
      <div className="pagination-outer" style={{ marginTop: "10px" }}>
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={!hasPrevPage || loading}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasNextPage || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyWalletPaymentLog;
