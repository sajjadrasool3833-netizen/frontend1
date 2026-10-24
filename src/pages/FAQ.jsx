import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I know which size will fit me?",
      answer: "Every product page has a detailed size chart with chest, waist, and length measurements. If you're between sizes, we recommend sizing up for undergarments. You can also WhatsApp us your measurements and we'll recommend the right size before you order."
    },
    {
      question: "Are the Peshawari chappals genuine leather?",
      answer: "Yes, all our Peshawari chappals are made from 100% genuine leather, handmade by skilled artisans."
    },
    {
      question: "How fast is delivery in Toba Tek Singh?",
      answer: "We offer same-day delivery in Toba Tek Singh city for orders placed before 2 PM. Next-day delivery is available for Gojra, Kamalia, and Pir Mahal."
    },
    {
      question: "What if the size doesn't fit or the item is defective?",
      answer: "We offer a 7-day easy exchange policy. If the size doesn't fit, we'll pick it up and send the right size. No restocking fees."
    },
    {
      question: "Do you offer wholesale / bulk pricing?",
      answer: "Yes, we offer special wholesale rates for shops and resellers across the district. Please contact us on WhatsApp for bulk orders."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="faq-page">
      {/* Top Banner (Screenshot 19) */}
      <div className="faq-banner">
        <h2>Looking for quick answers?</h2>
        <p>Many questions about shipping, returns, and sizing are answered in our FAQ.</p>
        <button className="btn-outline">Visit the FAQ</button>
      </div>

      {/* Main FAQ Section (Screenshot 20) */}
      <div className="faq-content">
        <p className="sub-heading">✦ FAQS</p>
        <h1>Frequently Asked Questions</h1>
        <p className="desc">Can't find your answer? WhatsApp us anytime — we reply fast.</p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <div className={`icon-circle ${openIndex === index ? 'active' : ''}`}>
                  {openIndex === index ? <X size={18} color="white" /> : <Plus size={18} color="#f05a28" />}
                </div>
              </div>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;