"use client";
import React from "react";

const Kundli = () => {
  const dateData = [];
  const yearData = [];
  const hoursData = [];
  const minutesData = [];
  const secondsData = [];

  function getCurrentYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }

  for (let i = 1; i <= 31; i++) {
    const dateString = i < 10 ? `0${i}` : `${i}`;
    dateData.push({ dateItem: dateString });
  }

  for (let i = 1950; i <= getCurrentYear(); i++) {
    const yearString = i < 10 ? `0${i}` : `${i}`;
    yearData.push({ yearItem: yearString });
  }

  for (let i = 0; i <= 23; i++) {
    const hoursString = i < 10 ? `0${i}` : `${i}`;
    hoursData.push({ hoursItem: hoursString });
  }
  for (let i = 0; i <= 59; i++) {
    const minutesString = i < 10 ? `0${i}` : `${i}`;
    minutesData.push({ minutesItem: minutesString });
  }
  for (let i = 0; i <= 59; i++) {
    const secondsString = i < 10 ? `0${i}` : `${i}`;
    secondsData.push({ secondsItem: secondsString });
  }
  return (
    <section className="new-kundali">
      <div className="container">
        <div className="new-kundali-inner">
          <div className="new-kundali-header">
            <h1>Kundli</h1>
            <p>
              Unlock the secrets of your destiny with our comprehensive Kundli
              analysis. Gain valuable insights into your future and make
              informed decisions.
            </p>
          </div>
          <div className="new-kundali-form admin-form-box">
            <form method="post" action="https://weddingbyte.com/kundli">
              <input
                type="hidden"
                name="_token"
                value="fQjxPa3LypqUxxfJ5hOlKBLDNYiGhUQXYFZU69Ga"
              />
              <h3>new kundli</h3>

              <div className="kundali__details">
                <div className="input__name form-field">
                  <div className="label-content">
                    <label for="">name</label>
                  </div>
                  <input
                    name="name"
                    type="text"
                    placeholder="name"
                    className="common-input-filed"
                  />
                </div>

                <div className="input__name form-field">
                  <div className="label-content">
                    <label for="">Gender</label>
                  </div>
                  <select name="gender" className="common-input-filed">
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </div>
              </div>

              <div className="kundali_horo">
                <h5>birth details</h5>

                <div className="kundali-second">
                  <div className="input__names form-field">
                    <div className="label-content">
                      <label for="day">Date</label>
                    </div>
                    <select id="day" name="day" className="common-input-filed">
                      <option value="">Select Date</option>
                      {dateData.map((item) => {
                        return (
                          <>
                            <option value={item?.dateItem}>
                              {item?.dateItem}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <div className="input__names form-field">
                    <div className="label-content">
                      <label for="month">Month</label>
                    </div>
                    <select
                      id="month"
                      name="month"
                      className="common-input-filed"
                    >
                      <option value="">Select Month</option>

                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>

                  <div className="input__names form-field">
                    <div className="label-content">
                      <label for="year">Year</label>
                    </div>
                    <select
                      id="year"
                      name="year"
                      className="common-input-filed"
                    >
                      <option value="">Select Year</option>
                      {yearData.map((item) => {
                        return (
                          <>
                            <option value={item?.yearItem}>
                              {item?.yearItem}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <div className="input__names form-field">
                    <div className="label-content">
                      <label for="hours">Hours</label>
                    </div>
                    <select
                      id="hours"
                      name="hours"
                      className="common-input-filed"
                    >
                      <option value="00">Select Hours</option>

                      {hoursData.map((item) => {
                        return (
                          <>
                            <option value={item?.hoursItem}>
                              {item?.hoursItem}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <div className="input__names form-field">
                    <div className="label-content">
                      <label for="minutes">Minutes</label>
                    </div>
                    <select
                      id="minutes"
                      name="minutes"
                      className="common-input-filed"
                    >
                      <option value="00">Select Minutes</option>

                      {minutesData.map((item) => {
                        return (
                          <>
                            <option value={item?.minutesItem}>
                              {item?.minutesItem}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <div className="input__names form-field">
                    <div className="label-content">
                      <label for="seconds">Seconds</label>
                    </div>
                    <select
                      id="seconds"
                      name="seconds"
                      className="common-input-filed"
                    >
                      <option value="00">Select Seconds</option>

                      {secondsData.map((item) => {
                        return (
                          <>
                            <option value={item?.secondsItem}>
                              {item?.secondsItem}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="input__name birth_place form-field">
                <div className="label-content">
                  <label for="">birth place</label>
                </div>
                <input
                  placeholder="enter place of birth"
                  name="birth_place"
                  id="birth_place"
                  className="common-input-filed"
                />
              </div>

              <div className="button">
                <input id="show-kundli" type="submit" value="Show Kundli" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kundli;
