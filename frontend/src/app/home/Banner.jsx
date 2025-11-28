"use client";
import Link from "next/link";
import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = ({ homeBannerData }) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  return (
    <>
      {/* <!---- Banner Section Start ---> */}
      <section
        className="banner-main"
        style={{
          backgroundImage: "url(/ast-new-bg-2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div class="starfield">
<span></span>
<span></span>
<span></span>
<span></span>
</div>
<div class="ast_waves">
<div class="ast_wave"></div>
<div class="ast_wave"></div>
<div class="ast_wave"></div>
</div>
<div class="ast_waves2">
<div class="ast_wave"></div>
<div class="ast_wave"></div>
<div class="ast_wave"></div>
</div>
        <div className="container">
          <Slider {...sliderSettings}>
            {homeBannerData?.map((item) => (
              <div className="banner" key={item?._id}>
                <div className="row">
                  {/* <div className="right-col">
                    <img src="/zodiac-circle.png" />
                  </div> */}

                  <div className="left-col">
                    <h1>{item?.banner_heading}</h1>
                    <p>{item?.banner_desc}</p>
                    <div className="btn-wrapper">
                      <Link href={item?.banner_btn_link} className="btn">
                        {item?.banner_btn_name}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      {/* <!---- Banner Section End here---> */}
    </>
  );
};

export default Banner;
