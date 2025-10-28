"use client";
import Link from "next/link";
import React from "react";

const Astrology = () => {
  return (
    <>
      {/* <!---- Astrology section start here---> */}
      <section className="section-spacing astrology_seciton">
        <div className="container">
          <div className="astro-inner">
            <div className="home-heading">
              <h2>Our Astrology Services</h2>
            </div>
            <div className="row">
              <div className="col">
                <Link
                  href="https://weddingbyte.com/daily-horoscope"
                  target="_blank"
                >
                  <div className="content-wrap">
                    <h3>Daily Horoscope Insights</h3>
                    <p>
                      {" "}
                      Discover your daily predictions for love, finance, career,
                      and wellness — powered by authentic Vedic astrology.
                    </p>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link href="https://weddingbyte.com/kundli" target="_blank">
                  <div className="content-wrap">
                    <h3>Personalized Birth Chart (Kundli)</h3>
                    <p>
                      {" "}
                      Generate your free Kundli instantly and unlock deep
                      insights about your destiny, personality, and planetary
                      positions.{" "}
                    </p>
                  </div>
                </Link>
              </div>

              <div className="col">
                <Link href="https://weddingbyte.com/e-invites" target="_blank">
                  <div className="content-wrap">
                    <h3>Compatibility & Matchmaking</h3>
                    <p>
                      {" "}
                      Find your perfect match with precise horoscope matching
                      and detailed compatibility analysis for relationships and
                      marriage.{" "}
                    </p>
                  </div>
                </Link>
              </div>
              <div className="col">
                <Link
                  href="https://weddingbyte.com/kundli-matching"
                  target="_blank"
                >
                  <div className="content-wrap">
                    <h3>Digital Invitation Cards</h3>
                    <p>
                      {" "}
                      Create elegant and eco-friendly e-invites for weddings,
                      poojas, or family functions — easy to design and share.{" "}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!---- Astrology section end here---> */}

      {/* <!---- Counter section start here---> */}
      <section className="counter_seciton">
        <div className="container">
          <h2>Our Growing Community</h2>
          <div className="row">
            <div className="col">
              <h3>47,000+ Verified Astrologers</h3>
              <p>Total Astrologers</p>
            </div>
            <div className="col">
              <h3>1.3 Billion+ Minutes of Consultation</h3>
              <p>Total Chat/Call minutes</p>
            </div>
            <div className="col">
              <h3>Over 100 Million Happy Users</h3>
              <p>Total Customers</p>
            </div>
          </div>
        </div>
      </section>
      {/* <!---- Counter section End here---> */}
    </>
  );
};

export default Astrology;
