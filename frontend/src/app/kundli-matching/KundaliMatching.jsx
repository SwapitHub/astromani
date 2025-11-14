"use client";
import React, { useState } from "react";

const KundaliMatching = () => {
  const [matchKundaliData, setMatchKundaliData] = useState();
  const [formData, setFormData] = useState({
    girl_name: "",
    girl_date_of_birth: "",
    girl_time_of_birth: "",
    girl_place_of_birth: "",
    boy_name: "",
    boy_date_of_birth: "",
    boy_time_of_birth: "",
    boy_place_of_birth: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      female: {
        year: new Date(formData.girl_date_of_birth).getFullYear(),
        month: new Date(formData.girl_date_of_birth).getMonth() + 1,
        date: new Date(formData.girl_date_of_birth).getDate(),
        hours: parseInt(formData.girl_time_of_birth.split(":")[0]),
        minutes: parseInt(formData.girl_time_of_birth.split(":")[1]),
        seconds: 0,
        latitude: 16.16667,
        longitude: 81.1333,
        timezone: 5.5,
      },
      male: {
        year: new Date(formData.boy_date_of_birth).getFullYear(),
        month: new Date(formData.boy_date_of_birth).getMonth() + 1,
        date: new Date(formData.boy_date_of_birth).getDate(),
        hours: parseInt(formData.boy_time_of_birth.split(":")[0]),
        minutes: parseInt(formData.boy_time_of_birth.split(":")[1]),
        seconds: 31,
        latitude: 16.51667,
        longitude: 80.61667,
        timezone: 5.5,
      },
      config: {
        observation_point: "topocentric",
        language: "en",
        ayanamsha: "lahiri",
      },
    };

    const bodyData = JSON.stringify(requestData);

    try {
      const response = await fetch(
        "https://json.freeastrologyapi.com/match-making/ashtakoot-score",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,

            // Allowed in Node.js (ignored in browsers)
            "User-Agent": "Mozilla/5.0",
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            Host: "json.freeastrologyapi.com",
            "Content-Length": bodyData.length.toString(),
          },
          body: bodyData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Compatibility Result:", data);
        setMatchKundaliData(data?.output);
      } else {
        console.error("API Error:", data);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  return (
    <section className="new-kundali">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="new-kundali-inner">
            <div className="new-kundali-form-left">
              <div className="girl-wed-detail">
                <h3>Enter girl's details</h3>
              </div>

              <div className="kundal-milap">
                <div className="kundali-details-milan">
                  <div className="input__name">
                    <label>Name</label>
                    <input
                      name="girl_name"
                      type="text"
                      placeholder="Full name"
                      value={formData.girl_name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input__name">
                    <label>Date of birth</label>
                    <input
                      name="girl_date_of_birth"
                      type="date"
                      value={formData.girl_date_of_birth}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="kundali-horo-milan">
                  <div className="kundali-second-milan">
                    <div className="input__names">
                      <label>Time of birth</label>
                      <input
                        name="girl_time_of_birth"
                        type="time"
                        value={formData.girl_time_of_birth}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="birth-dates">
                      <label>Place of birth</label>
                      <input
                        name="girl_place_of_birth"
                        type="text"
                        placeholder="Place of birth"
                        value={formData.girl_place_of_birth}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="new-kundali-form-right">
              <div className="girl-wed-detail">
                <h3>Enter boy's details</h3>
              </div>

              <div className="kundali-milap-ryt">
                <div className="kundali-details-milan">
                  <div className="input__name">
                    <label>Name</label>
                    <input
                      name="boy_name"
                      type="text"
                      placeholder="Full name"
                      value={formData.boy_name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input__name">
                    <label>Date of birth</label>
                    <input
                      name="boy_date_of_birth"
                      type="date"
                      value={formData.boy_date_of_birth}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="kundali-horo-milan">
                  <div className="kundali-second-milan">
                    <div className="input__names">
                      <label>Time of birth</label>
                      <input
                        name="boy_time_of_birth"
                        type="time"
                        value={formData.boy_time_of_birth}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="birth-dates">
                      <label>Place of birth</label>
                      <input
                        name="boy_place_of_birth"
                        type="text"
                        placeholder="Place of birth"
                        value={formData.boy_place_of_birth}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="compatibilty-btn">
            <button type="submit">Check your compatibility</button>
          </div>
        </form>

        {matchKundaliData && (
          <div className="kundali-result">
            <h2>💑 Kundali Matching Result</h2>

            <h3>
              Total Score: {matchKundaliData?.total_score} /{" "}
              {matchKundaliData?.out_of}
            </h3>

            {/* VARNA */}
            <div className="common-matching">
              <h4>Varna Kootam</h4>
              <p>
                <strong>Bride:</strong>{" "}
                {matchKundaliData?.varna_kootam.bride.moon_sign} (
                {matchKundaliData?.varna_kootam.bride.varnam_name})
              </p>
              <p>
                <strong>Groom:</strong>{" "}
                {matchKundaliData?.varna_kootam.groom.moon_sign} (
                {matchKundaliData?.varna_kootam.groom.varnam_name})
              </p>
              <p>
                <strong>Score:</strong> {matchKundaliData?.varna_kootam.score} /{" "}
                {matchKundaliData?.varna_kootam.out_of}
              </p>
            </div>

            {/* VASYA */}
            <div className="common-matching">
              <h4>Vasya Kootam</h4>
              <p>
                <strong>Bride:</strong>{" "}
                {matchKundaliData?.vasya_kootam.bride.bride_kootam_name}
              </p>
              <p>
                <strong>Groom:</strong>{" "}
                {matchKundaliData?.vasya_kootam.groom.groom_kootam_name}
              </p>
              <p>
                <strong>Score:</strong> {matchKundaliData?.vasya_kootam.score} /{" "}
                {matchKundaliData?.vasya_kootam.out_of}
              </p>
            </div>

            {/* TARA */}
            <div className="common-matching">
              <h4>Tara Kootam</h4>
              <p>
                <strong>Bride Star:</strong>{" "}
                {matchKundaliData?.tara_kootam.bride.star_name}
              </p>
              <p>
                <strong>Groom Star:</strong>{" "}
                {matchKundaliData?.tara_kootam.groom.star_name}
              </p>
              <p>
                <strong>Score:</strong> {matchKundaliData?.tara_kootam.score} /{" "}
                {matchKundaliData?.tara_kootam.out_of}
              </p>
            </div>

            {/* YONI */}
            <div className="common-matching">
              <h4>Yoni Kootam</h4>
              <p>
                <strong>Bride Yoni:</strong>{" "}
                {matchKundaliData?.yoni_kootam.bride.yoni}
              </p>
              <p>
                <strong>Groom Yoni:</strong>{" "}
                {matchKundaliData?.yoni_kootam.groom.yoni}
              </p>
              <p>
                <strong>Score:</strong> {matchKundaliData?.yoni_kootam.score} /{" "}
                {matchKundaliData?.yoni_kootam.out_of}
              </p>
            </div>

            {/* GRAHA MAITRI */}
            <div className="common-matching">
              <h4>Graha Maitri</h4>
              <p>
                <strong>Bride Moon Lord:</strong>{" "}
                {
                  matchKundaliData?.graha_maitri_kootam.bride
                    .moon_sign_lord_name
                }
              </p>
              <p>
                <strong>Groom Moon Lord:</strong>{" "}
                {
                  matchKundaliData?.graha_maitri_kootam.groom
                    .moon_sign_lord_name
                }
              </p>
              <p>
                <strong>Score:</strong>{" "}
                {matchKundaliData?.graha_maitri_kootam.score} /{" "}
                {matchKundaliData?.graha_maitri_kootam.out_of}
              </p>
            </div>

            {/* GANA */}
            <div className="common-matching">
              <h4>Gana Kootam</h4>
              <p>
                <strong>Bride:</strong>{" "}
                {matchKundaliData?.gana_kootam.bride.bride_nadi_name}
              </p>
              <p>
                <strong>Groom:</strong>{" "}
                {matchKundaliData?.gana_kootam.groom.groom_nadi_name}
              </p>
              <p>
                <strong>Score:</strong> {matchKundaliData?.gana_kootam.score} /{" "}
                {matchKundaliData?.gana_kootam.out_of}
              </p>
            </div>

            {/* RASI */}
            <div className="common-matching">
              <h4>Rasi Kootam</h4>
              <p>
                <strong>Bride Rasi:</strong>{" "}
                {matchKundaliData?.rasi_kootam.bride.moon_sign_name}
              </p>
              <p>
                <strong>Groom Rasi:</strong>{" "}
                {matchKundaliData?.rasi_kootam.groom.moon_sign_name}
              </p>
              <p>
                <strong>Score:</strong> {matchKundaliData?.rasi_kootam.score} /{" "}
                {matchKundaliData?.rasi_kootam.out_of}
              </p>
            </div>

            {/* NADI */}
            <div className="common-matching">
              <h4>Nadi Kootam</h4>
              <p>
                <strong>Bride Nadi:</strong>{" "}
                {matchKundaliData?.nadi_kootam.bride.nadi_name}
              </p>
              <p>
                <strong>Groom Nadi:</strong>{" "}
                {matchKundaliData?.nadi_kootam.groom.nadi_name}
              </p>
              <p>
                <strong>Score:</strong> {matchKundaliData?.nadi_kootam.score} /{" "}
                {matchKundaliData?.nadi_kootam.out_of}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default KundaliMatching;
