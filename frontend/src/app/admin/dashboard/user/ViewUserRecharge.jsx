import MyWalletPaymentLog from "@/app/my-wallet/MyWalletPaymentLog";
import React from "react";

const ViewUserRecharge = ({ viewUserDetails, setViewProductStatus }) => {
  console.log(viewUserDetails, "viewUserDetails");

  return (
    <div className="astro-detail-mains recharge-user-detail">
      <span
        className="close"
        onClick={() => {
          setViewProductStatus(false);
        }}
      >
        X
      </span>
      <div className="profile-table">
        <div className="inner-profile-table">
          <div className="common-profile">
            <div className="name">Name</div>
            <div className="input-outer">{viewUserDetails?.name}</div>
          </div>
          <div className="common-profile">
            <div className="name">Total Amount</div>
            <div className="input-outer">{viewUserDetails?.totalAmount}</div>
          </div>

          <div className="common-profile">
            <div className="deviceUse">Language</div>
            <div className="input-outer">{viewUserDetails?.language}</div>
          </div>

          <div className="common-profile">
            <div className="deviceUse">Place Of Born</div>
            <div className="input-outer">{viewUserDetails?.placeOfBorn}</div>
          </div>

          <div className="common-profile">
            <div className="deviceUse">Gender</div>
            <div className="input-outer">{viewUserDetails?.gender}</div>
          </div>
        </div>
      </div>
      {viewUserDetails?.paymentHistory?.length > 0 && (
        <MyWalletPaymentLog userPhoneRecharge={viewUserDetails?.phone} />
      )}
    </div>
  );
};

export default ViewUserRecharge;
