"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateAstrologerForm } from "../component/FormValidation";

const AstrologerRegistration = () => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [languageListData, setLanguageListData] = useState([]);
  const [professionsList, setProfessionsList] = useState([]);

  const todayDate = new Date().toISOString().split("T")[0];

  const handleSubmitSignup = async () => {
    const validationErrors = validateAstrologerForm("astrologer");
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // ✅ Collect selected languages
    const selectedLanguages = Array.from(
      document.querySelectorAll('input[name="languages"]:checked')
    ).map((input) => input.value);

    const selectedProfessions = Array.from(
      document.querySelectorAll('input[name="profession"]:checked')
    ).map((input) => input.value);

    // ✅ Get files
    const aadhaarFile = document.getElementById("aadhaarCard")?.files?.[0];
    const certificateFile = document.getElementById("certificate")?.files?.[0];
    const profileImageFile =
      document.getElementById("profileImage")?.files?.[0];

    // ✅ Validate required fields
    const firstName = document.getElementById("fname").value;
    const Experiences = document.getElementById("Experience").value;
    const Charge = document.getElementById("Charges").value;

    const dob = document.getElementById("birthday").value;
    const gender = document.querySelector(
      'input[name="gender"]:checked'
    )?.value;

    const deviceUse = document.getElementById("deviceUse").value;
    const email = document.getElementById("emails").value;
    const Password = document.getElementById("Password").value;
    const mobileNumber = document.getElementById("mobileNumber").value;

    if (
      !firstName ||
      !dob ||
      !gender ||
      selectedLanguages.length === 0 ||
      selectedProfessions.length === 0 ||
      !deviceUse ||
      !email ||
      !Password ||
      !mobileNumber ||
      !aadhaarFile ||
      !certificateFile ||
      !profileImageFile ||
      !Experiences ||
      !Charge
    ) {
      console.warn("All form fields are required.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", firstName);
      formData.append("experience", Experiences);
      formData.append("charges", Charge);

      formData.append("dateOfBirth", dob);
      formData.append("gender", gender);

      formData.append("deviceUse", deviceUse);
      formData.append("email", email);
      formData.append("Password", Password);
      formData.append("mobileNumber", mobileNumber);
      formData.append("astroStatus", false); // default

      // ✅ Append languages
      selectedLanguages.forEach((lang) => {
        formData.append("languages[]", lang);
      });

      selectedProfessions.forEach((prof) => {
        formData.append("professions[]", prof);
      });
      // ✅ Append files
      if (aadhaarFile) formData.append("aadhaarCard", aadhaarFile);
      if (certificateFile) formData.append("certificate", certificateFile);
      if (profileImageFile) formData.append("profileImage", profileImageFile);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/auth/astrologer-registration`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "success") {
        // ✅ Reset form
        document.querySelector("form").reset();
        setSuccessMessage("success");
        toast.success("Registration successful", { position: "top-right" });
      }

      console.log("Registration successful:", response.data);
    } catch (error) {
      toast.error("Email or mobile number already registered", {
        position: "top-right",
      });
      console.error("Error in registration API:", error);
    }
  };

  const fetchLanguageList = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/add-Language-astrologer`
      );
      setLanguageListData(response.data);
    } catch (error) {
      console.error("Fetch language list error:", error);
    } finally {
    }
  };

  const fetchProfessionsList = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/add-Profession-astrologer`
      );
      setProfessionsList(response.data);
    } catch (error) {
      console.error("Fetch professions list error:", error);
    }
  };

  useEffect(() => {
    fetchProfessionsList();
    fetchLanguageList();
  }, []);

  return (
    <main className="main-content">
      {successMessage == "success" ? (
        <section className="astrologer-registration-bg">
          <div className="container">
            <div className="astrologer-registration-wrapper">
              <div className="inner-astrologer-registration">
                <div className="registration-heading">
                  <h1 className="common-h1-heading">Astrologer Registration</h1>
                </div>
              </div>
              <div className="astrologer-thanks-section-bg">
                <div className="inner-thanks-section">
                  <img src="./thanku-img.png" alt="Thank You" />
                </div>
                <div className="thanks-section-content">
                  <p>Thank you for registering as an astrologer with us!</p>

                  <p>
                    Our team will now carefully review your profile and the
                    documents you have submitted. This process typically takes
                    between 24 to 48 hours.
                  </p>

                  <p>
                    Once your details are verified and approved, you will
                    receive a confirmation email or message with login access
                    and further instructions.
                  </p>

                  <p>
                    We appreciate your interest in joining our platform and look
                    forward to having you share your expertise with those
                    seeking guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="astrologer-registration-bg">
          <div className="container">
            <div className="astrologer-registration-wrapper">
              <div className="inner-astrologer-registration">
                <div className="registration-heading">
                  <h1 className="common-h1-heading">Astrologer Registration</h1>
                </div>
              </div>
              <div className="astrologer-registration-form">
                <form action="">
                  <div className="form-filed-section-bg">
                    <div className="inner-form-filed-sec">
                      <div className="label-content">
                        <label htmlFor="aadhaarCard">
                          Upload Aadhaar Card{" "}
                          <span>(आधार कार्ड अपलोड करें)</span>
                        </label>
                      </div>
                      <input
                        type="file"
                        id="aadhaarCard"
                        name="aadhaarCard"
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="common-input-filed"
                      />
                      {errors.aadhaarFile && (
                        <p className="error">{errors.aadhaarFile}</p>
                      )}
                    </div>

                    <div className="add-profile-content">
                      <div className="inner-form-filed-sec full">
                        <div className="label-content">
                          <label htmlFor="image">
                            Upload Image <span>(छवि अपलोड करें)</span>
                          </label>
                        </div>
                        <input
                          type="file"
                          id="profileImage"
                          name="profileImage"
                          accept=".jpg, .jpeg, .png"
                          className="common-input-filed"
                          // onChange={() => {
                          //   setErrors((prev) => {
                          //     const newErrors = { ...prev };
                          //     delete newErrors.imagePic;
                          //     return newErrors;
                          //   });
                          // }}
                        />
                        {errors.profileImage && (
                          <p className="error">{errors.profileImage}</p>
                        )}
                      </div>
                    </div>

                    <div className="inner-form-filed-sec">
                      <div className="label-content">
                        <label htmlFor="certificate">
                          Upload Certificate{" "}
                          <span>(प्रमाणपत्र अपलोड करें)</span>
                        </label>
                      </div>
                      <input
                        type="file"
                        id="certificate"
                        name="certificate"
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="common-input-filed"
                      />
                      {errors.certificateFile && (
                        <p className="error">{errors.certificateFile}</p>
                      )}
                    </div>

                    <div className="inner-form-filed-sec">
                      <div className="label-content">
                        <label for="Name">
                          Name <span>(नाम)</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        id="fname"
                        name="fname"
                        className="common-input-filed"
                        placeholder="Please enter your name here"
                      />
                      {errors.firstName && (
                        <p className="error">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="inner-form-filed-sec">
                      <div className="label-content">
                        <label for="birthday">
                          Date of Birth <span>(जन्मतिथि)</span>
                        </label>
                      </div>

                      <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        className="common-input-filed"
                        placeholder="Please enter your date of birth"
                        max={todayDate}
                      />
                      {errors.dateOfBirth && (
                        <p className="error">{errors.dateOfBirth}</p>
                      )}
                    </div>

                    <div className="inner-form-filed-sec">
                      <div className="label-content">
                        <label htmlFor="gender">
                          Gender <span>(लिंग)</span>
                        </label>
                      </div>
                      <div className="man-input-filed-sec input-gender-sec">
                        <div className="inner-radio">
                          <input
                            type="radio"
                            id="Male"
                            name="gender"
                            value="Male"
                          />
                          <label htmlFor="Male">Male</label>
                        </div>
                        <div className="inner-radio">
                          <input
                            type="radio"
                            id="Female"
                            name="gender"
                            value="Female"
                          />
                          <label htmlFor="Female">Female</label>
                        </div>
                        <div className="inner-radio">
                          <input
                            type="radio"
                            id="Other"
                            name="gender"
                            value="Other"
                          />
                          <label htmlFor="Other">Other</label>
                        </div>
                        {errors.gender && (
                          <p className="error">{errors.gender}</p>
                        )}
                      </div>
                    </div>

                    <div className="inner-form-filed-sec">
                      <div className="label-content">
                        <label for="Languages">
                          Languages <span>(भाषाएँ)</span>
                        </label>
                      </div>
                      <div className="man-input-filed-sec">
                        {languageListData?.map((lang) => {
                          return (
                            <label key={lang._id}>
                              <input
                                type="checkbox"
                                name="languages"
                                value={lang.languages}
                                id="languages"
                                // onChange={handleLanguageCheckboxChange}
                              />
                              <span>{lang.languages}</span>
                            </label>
                          );
                        })}
                        {errors.languages && (
                          <p className="error">{errors.languages}</p>
                        )}
                      </div>
                    </div>
                    <div className="inner-form-filed-sec">
                      <div className="label-content">
                        <label>
                          Skills <span>(कौशल)</span>
                        </label>
                      </div>
                      <div className="man-input-filed-sec">
                        {professionsList?.map((item) => (
                          <label key={item._id}>
                            <input
                              type="checkbox"
                              name="profession"
                              id="profession"
                              value={item.professions}
                              // checked={editProfessions.includes(item.professions)}
                              // onChange={handleProfessionChange}
                            />
                            <span>{item.professions}</span>
                          </label>
                        ))}
                        {errors.profession && (
                          <p className="error">{errors.profession}</p>
                        )}
                      </div>
                    </div>

                    <div className="inner-form-filed-sec">
                      <div className="label-content">
                        <label for="Name">
                          Experience <span>(अनुभव)</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        id="Experience"
                        name="Experience"
                        className="common-input-filed"
                        placeholder="Enter your Exp"
                        // value={experience}
                        // onChange={(e) => setExperience(e.target.value)}
                      />
                      {errors.Experience && (
                        <p className="error">{errors.Experience}</p>
                      )}
                    </div>

                    <div className="inner-form-filed-sec full">
                      <div className="label-content">
                        <label for="Name">
                          Charges <span>(शुल्क)</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        id="Charges"
                        name="Charges"
                        className="common-input-filed"
                        placeholder="enter your charge"
                        // value={editCharges}
                        // onChange={(e) => setEditCharges(e.target.value)}
                      />
                      {errors.Charges && (
                        <p className="error">{errors.Charges}</p>
                      )}
                    </div>
                    <div className="inner-form-filed-sec">
                      <div className="label-content">
                        <label for="use-phone">
                          Which phone do you use?{" "}
                          <span>(आप कौन सा फ़ोन इस्तेमाल करते हैं?)</span>
                        </label>
                      </div>

                      <select
                        name="deviceUse"
                        id="deviceUse"
                        className="common-input-filed"
                      >
                        <option value="select device">
                          Please select device
                        </option>
                        <option value="Iphone">Iphone</option>
                        <option value="Android">Android</option>
                      </select>
                      {errors.deviceUse && (
                        <p className="error">{errors.deviceUse}</p>
                      )}
                    </div>

                    <div className="inner-form-filed-sec">
                      <div className="label-content">
                        <label for="birthday">
                          Email Address <span> (मेल पता)</span>
                        </label>
                      </div>

                      <input
                        type="email"
                        id="emails"
                        name="emails"
                        multiple
                        className="common-input-filed"
                        placeholder="Enter your email here"
                        required
                      />
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="inner-form-filed-sec">
                      <div className="label-content">
                        <label for="birthday">
                          Password <span> (पासवर्ड)</span>
                        </label>
                      </div>

                      <input
                        type="Password"
                        id="Password"
                        name="Password"
                        multiple
                        className="common-input-filed"
                        placeholder="Password"
                        required
                      />
                      {errors.Password && (
                        <p className="error">{errors.Password}</p>
                      )}
                    </div>

                    <div className="inner-form-filed-sec">
                      <div className="label-content">
                        <label for="birthday">
                          Mobile Number <span>(मोबाइल नंबर)</span>
                        </label>
                      </div>

                      <input
                        type="text"
                        placeholder="Enter phone number"
                        id="mobileNumber"
                        name="quantity"
                        onInput={(e) => {
                          e.target.value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10);
                        }}
                        className="common-input-filed"
                      />
                      {errors.mobileNumber && (
                        <p className="error">{errors.mobileNumber}</p>
                      )}
                    </div>
                  </div>
                  <div className="reg-sumbit-button">
                    <button type="button" onClick={handleSubmitSignup}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
export default AstrologerRegistration;
