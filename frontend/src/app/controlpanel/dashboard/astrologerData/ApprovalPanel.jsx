import React from "react";
import { useState } from "react";
import AstroLogerList from "./AstroLogerList";
import AstrologerPendingList from "./AstrologerPendingList";

const ApprovalPanel = ({setUpdateButton}) => {
  const [approvalStatus, setApprovalStatus] = useState("confirm");

  return (
    <>
      <div className={`astrologer-list-filter inner-btn`}>
       
        <button className={`${approvalStatus == "confirm"?"active":""}`}
          onClick={() => {
            setApprovalStatus("confirm");
          }}
        >
          Confirm
        </button>
         <button className={`${approvalStatus == "confirm"?"":"active"}`}
          onClick={() => {
            setApprovalStatus("pending");
          }}
        >
          Pending
        </button>
      </div>
      {approvalStatus == "confirm" ? (
        <AstroLogerList setUpdateButton={setUpdateButton}/>
      ) : (
        <AstrologerPendingList setUpdateButton={setUpdateButton}/>
      )}
    </>
  );
};

export default ApprovalPanel;
