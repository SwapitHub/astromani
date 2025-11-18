import React from "react";

const DailyHoroscope = () => {
  return (
    <section className="legacies-horo cstm-legacies-horo">
      <div className="container">
        <div className="legacies-horo-inner">
          <div className="legacies-horo-head">
            <h1>Daily Horoscope</h1>
            <p>
              Today, embrace change with optimism. Opportunities arise from
              unexpected corners. Stay adaptable, and trust your intuition. Love
              and connections flourish.
            </p>
          </div>
          <div className="legacies-horo-main">
            <div className="legacies-horo-wrap">
              <div className="legacies-horo-scope">
                <a href="#result_div" className="show_horo" id="aries">
                  <div className="horo-legacyimg">
                    <img src="https://weddingbyte.com/public/front/images/Aries1.png" />
                  </div>
                  <div className="horo-featred-title">
                    <h4>aries</h4>
                  </div>
                </a>
              </div>
              <div className="legacies-horo-scope">
                <a href="#result_div" className="show_horo" id="taurus">
                  <div className="horo-legacyimg">
                    <img src="https://weddingbyte.com/public/front/images/Taurus1.png" />
                  </div>
                  <div className="horo-featred-title">
                    <h4>Taurus</h4>
                  </div>
                </a>
              </div>
              <div className="legacies-horo-scope">
                <a href="#result_div" className="show_horo" id="gemini">
                  <div className="horo-legacyimg">
                    <img src="https://weddingbyte.com/public/front/images/Gemini1.png" />
                  </div>
                  <div className="horo-featred-title">
                    <h4>Gemini </h4>
                  </div>
                </a>
              </div>
              <div className="legacies-horo-scope">
                <a href="#result_div" className="show_horo" id="cancer">
                  <div className="horo-legacyimg">
                    <img src="https://weddingbyte.com/public/front/images/Cancer1.png" />
                  </div>
                  <div className="horo-featred-title">
                    <h4>Cancer </h4>
                  </div>
                </a>
              </div>
              <div className="legacies-horo-scope">
                <a href="#result_div" className="show_horo" id="leo">
                  <div className="horo-legacyimg">
                    <img src="https://weddingbyte.com/public/front/images/Leo1.png" />
                  </div>
                  <div className="horo-featred-title">
                    <h4>Leo</h4>
                  </div>
                </a>
              </div>
              <div className="legacies-horo-scope">
                <a href="#result_div" className="show_horo" id="virgo">
                  <div className="horo-legacyimg">
                    <img src="https://weddingbyte.com/public/front/images/Virgo1.png" />
                  </div>
                  <div className="horo-featred-title">
                    <h4>Virgo</h4>
                  </div>
                </a>
              </div>
              <div className="legacies-horo-scope">
                <a href="#result_div" className="show_horo" id="libra">
                  <div className="horo-legacyimg">
                    <img src="https://weddingbyte.com/public/front/images/Libra1.png" />
                  </div>
                  <div className="horo-featred-title">
                    <h4>Libra</h4>
                  </div>
                </a>
              </div>
              <div className="legacies-horo-scope">
                <a href="#result_div" className="show_horo" id="scorpio">
                  <div className="horo-legacyimg">
                    <img src="https://weddingbyte.com/public/front/images/Scorpio1.png" />
                  </div>
                  <div className="horo-featred-title">
                    <h4>Scorpio</h4>
                  </div>
                </a>
              </div>
              <div className="legacies-horo-scope">
                <a href="#result_div" className="show_horo" id="sagittarius">
                  <div className="horo-legacyimg">
                    <img src="https://weddingbyte.com/public/front/images/Sagittarius1.png" />
                  </div>
                  <div className="horo-featred-title">
                    <h4>Sagittarius</h4>
                  </div>
                </a>
              </div>
              <div className="legacies-horo-scope">
                <a href="#result_div" className="show_horo" id="capricorn">
                  <div className="horo-legacyimg">
                    <img src="https://weddingbyte.com/public/front/images/Capricorn1.png" />
                  </div>
                  <div className="horo-featred-title">
                    <h4>Capricorn </h4>
                  </div>
                </a>
              </div>
              <div className="legacies-horo-scope">
                <a href="#result_div" className="show_horo" id="aquarius">
                  <div className="horo-legacyimg">
                    <img src="https://weddingbyte.com/public/front/images/Aquarius1.png" />
                  </div>
                  <div className="horo-featred-title">
                    <h4>Aquarius</h4>
                  </div>
                </a>
              </div>
              <div className="legacies-horo-scope">
                <a href="#result_div" className="show_horo" id="pisces">
                  <div className="horo-legacyimg">
                    <img src="https://weddingbyte.com/public/front/images/Pisces1.png" />
                  </div>
                  <div className="horo-featred-title">
                    <h4>Pisces</h4>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="legacy-horo-cnts">
            <h3>
              {" "}
              <span id="result_div"></span> : 17 Nov, 2025{" "}
            </h3>
            <p id="div_result">Please Wait...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyHoroscope;
