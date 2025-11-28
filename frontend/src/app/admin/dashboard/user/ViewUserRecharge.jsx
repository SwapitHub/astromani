import React from "react";

const ViewUserRecharge = ({ viewUserDetails, setViewProductStatus }) => {
console.log(viewUserDetails,"viewUserDetails");

  return (
    <div className="astro-detail-mains">
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
            <div className="deviceUse">Offer Name</div>
            <div className="input-outer">{viewUserDetails?.phone}</div>
          </div>
        
          <div className="common-profile">
            <div className="deviceUse">Offer Title</div>
            <div className="input-outer">{viewUserDetails?.totalAmount}</div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ViewUserRecharge;
