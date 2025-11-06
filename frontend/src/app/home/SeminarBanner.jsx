import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import SeminarUserForm from "../component/SeminarUserForm";
import Image from "next/image";

const SeminarBanner = ({ NewlySeminarList }) => {
  const [toggleSlideMobile, setToggleSlideMobile] = useState(false);

  useEffect(() => {
    const className = "user-seminar-opened";

    if (toggleSlideMobile) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  }, [toggleSlideMobile]);

  const handleBookSeat = () => {

    setToggleSlideMobile(true);
  };
  return (
    <section className="seminar-bannner">
      <SeminarUserForm
        setToggleSlideMobile={setToggleSlideMobile}
        NewlySeminarList_id={NewlySeminarList?._id}
      />
      <div className="container">
        <div className="seminar_wrapper">
          <div className="seminar-banner-row">            
            <div className="right_col">
              <div className="seminar_user_row">
                <div className="col">
                  <div className="img">
                    <Image
                      width={255}
                      height={255}
                      src={
                        NewlySeminarList?.singleImages?.img_url
                          ? process.env.NEXT_PUBLIC_WEBSITE_URL +
                            NewlySeminarList?.singleImages?.img_url
                          : "./user-icon-image.png"
                      }
                      alt="user-icon"
                    />
                  </div>
                  <div className="author">
                    <div className="heading">{NewlySeminarList?.name}</div>
                    <div className="para">{NewlySeminarList?.seminar_topic}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="left_col">
              <div className="content">
                <div className="new">new</div>
                <h1>
                  <span>
                    {" "}
                    <strong>2025</strong> Astrologer{" "}
                  </span>
                  Seminar
                </h1>
                <p>{NewlySeminarList?.seminar_detail}</p>
              </div>
              <div className="seminar_btn">
                <button onClick={() => handleBookSeat()}>
                  Reserve Your Spot
                </button>
              </div>
              <div className="seminar_date_location">
                <div className="row">
                  <div className="sm-dl-col">
                    <div className="icon">
                      <i className="fa-regular fa-calendar-days"></i>
                    </div>
                    <div className="text-date">
                      <SlCalender />
                      <span>{NewlySeminarList?.date_of_seminar}</span>
                    </div>
                  </div>
                  <div className="sm-dl-col">
                    <div className="icon">
                      <i className="fa-solid fa-clock"></i>
                    </div>
                    <div className="text-date">
                      <IoTimeOutline />{" "}
                      <span>{NewlySeminarList?.time_of_seminar}</span>
                    </div>
                  </div>
                  <div className="sm-dl-col">
                    <div className="icon">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div className="text-date">
                      <CiLocationOn />
                      <span>{NewlySeminarList?.location_seminar}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeminarBanner;
