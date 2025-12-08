import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TransitionPaymentPopUp = ({
  setToggleTansId,
  astrologerData,
  fetchTransactions,
}) => {
  console.log(astrologerData, "astrologerData");

  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI Transfer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const deductUpdateAmount = astrologerData?.totalAvailableBalance - amount;

  const handleSubmit = async () => {
    if (
      !amount ||
      !paymentMethod ||
      !transactionId ||
      !astrologerData?.email ||
      !astrologerData?.name
    ) {
      setError("Required all field");

      return;
    } else if (amount > astrologerData?.totalAvailableBalance) {
      setError("Amount is grater then current amount");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: astrologerData?.email,
        astrologerName: astrologerData?.name,
        Amount: amount,
        Payment_Method: paymentMethod,
        Transaction_id: transactionId,
        remaining_amount: deductUpdateAmount,
        astrologer_id: astrologerData?._id,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/send-email-sendEmail-admin-tans-amount-astro`,
        payload
      );

      if (res.status === 200) {
        const innerRes = await axios.put(
          `${process.env.NEXT_PUBLIC_WEBSITE_URL}/update-business-profile/${astrologerData?.mobileNumber}`,
          {
            totalAvailableBalance: deductUpdateAmount,
          }
        );
        fetchTransactions();
        setToggleTansId(false);
        toast.success("Send Email Successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error sending payment:", error);
    }

    setLoading(false);
  };

  return (
    <div className="TransitionPaymentPopUp admin-form-box">
      <span onClick={() => setToggleTansId(false)} className="close"></span>

      <h3>Send Payment Confirmation</h3>

      <div className="form-field">
        <div className="label-content">
          <label>Transaction ID</label>
        </div>
        <input
          className="common-input-filed"
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter transaction ID"
        />
      </div>

      <div className="form-field">
        <div className="label-content">
          <label>Amount</label>
        </div>
        <input
          className="common-input-filed"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className="form-field">
        <div className="label-content">
          <label>Payment Method</label>
        </div>
        <select
          className="common-input-filed"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="UPI Transfer">UPI Transfer</option>
          <option value="Account Transfer">Account Transfer</option>
        </select>
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Submit"}
      </button>
      <span>{error}</span>
    </div>
  );
};

export default TransitionPaymentPopUp;
