"use client";
import React, { useState } from "react";
import SlideToggle from "../component/SlideToggle";

const FaqHome = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Q1. How can I consult an astrologer on Astromani?",
      answer:
        " Simply sign up, choose your preferred astrologer, and start a chat or call instantly.",
    },
    {
      id: 2,
      question: "Q2. Are your astrologers certified?",
      answer:
        "Yes — every astrologer on Astromani is verified for credentials, experience, and client reviews.",
    },
    {
      id: 3,
      question: "Q3. What questions can I ask?",
      answer: " Anything about love, career, marriage, health, or personal challenges — no topic is too big or small.",
    },
     {
      id: 4,
      question: "Q4. Is my conversation private?",
      answer: "  Absolutely. All consultations are 100% confidential and securely encrypted.",
    },
     {
      id: 5,
      question: "Q5. Can I get a Kundli or Horoscope report?",
      answer: " Yes — you can download a detailed Kundli or request a personalized report after your consultation.",
    },
  ];

  return (
    <section className="faq_section section-spacing">
      <div className="container">
        <div className="home-heading">
          <h2>Faq's</h2>
        </div>
        <div className="faq-section">
          {faqs.map((faq) => (
            <div key={faq.id} className={`faq-item ${openFaq === faq.id ? "open" : ""}`}>
              <div
                className="faq-row"
                onClick={() =>
                  setOpenFaq(openFaq === faq.id ? null : faq.id)
                }
              >
                <div className="faq-question">{faq.question}</div>
                <div className="icon"></div>
              </div>
              <SlideToggle isOpen={openFaq === faq.id}>
                <div className="faq-answer">{faq.answer}</div>
              </SlideToggle>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqHome;
