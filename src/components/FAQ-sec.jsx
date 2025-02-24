import React, { useState, useEffect } from 'react';
import ArrowGif from '../assets/image/arrow-animation.gif';
import axios from 'axios';

const Faq = () => {
    const [faqData, setFaqData] = useState([]);
    const [openTab, setOpenTab] = useState(null);
    const [error, setError] = useState(null); // مدیریت خطا

    const toggleTab = (tabIndex) => {
        setOpenTab(openTab === tabIndex ? null : tabIndex);
    };

    useEffect(() => {
        const fetchFAQData = async () => {
            try {
                const response = await axios.get('http://localhost/faq-get', {
                    headers: {
                      domain: 'acoachgroup.com', // ارسال هدر دامنه بدون پروتکل
                    },
                  });

                  const result = response.data;


                if (result.code === '1' && result.data.length > 0) {
                    // فقط 4 داده اول را انتخاب کنید
                    setFaqData(result.data.slice(0, 5)); // ذخیره 4 آیتم اول
                  } else {
                    setError('داده‌ای یافت نشد.');
                  }
            } catch (error) {
                console.error('Error fetching FAQ data:', error);
            }
        };

        fetchFAQData();
    }, []);

    
      if (error) {
        return <div>{error}</div>; // نمایش پیام خطا
      }

    return (
        <div className="xclf xclf-86a0c15 e-con-full e-flex e-con e-child" cvc="86a0c15" mm="container">
            <div className="xclf xclf-9d98743 ggeexx-widget ggeexx-widget-accordion" cvc="9d98743" mm="widget" nn="accordion.default">
                <div className="MKhfd">
                    <div className="ggeexx-accordion">
                        {faqData.map((faq) => (
                            <div className="ggeexx-accordion-item" key={faq.id}>
                                <div
                                    id={`ggeexx-tab-title-${faq.id}`}
                                    className="ggeexx-tab-title"
                                    data-tab={faq.id}
                                    role="button"
                                    aria-controls={`ggeexx-tab-content-${faq.id}`}
                                    aria-expanded={openTab === faq.id}
                                    onClick={() => toggleTab(faq.id)}
                                    onKeyPress={(e) => e.key === 'Enter' && toggleTab(faq.id)}
                                    tabIndex={0}
                                >
                                    <span className="ggeexx-accordion-icon ggeexx-accordion-icon-left" aria-hidden="true">
                                        <span className="ggeexx-accordion-icon-closed">
                                            <i className="fas fa-caret-down" />
                                        </span>
                                        <span className="ggeexx-accordion-icon-opened">
                                            <i className="fas fa-caret-up" />
                                        </span>
                                    </span>
                                    <a className="ggeexx-accordion-title" tabIndex={0}>
                                        {faq.title}
                                    </a>
                                </div>
                                <div
                                    id={`ggeexx-tab-content-${faq.id}`}
                                    className={`ggeexx-tab-content ggeexx-clearfix ${openTab === faq.id ? 'open' : 'closed'}`}
                                    data-tab={faq.id}
                                    role="region"
                                    aria-labelledby={`ggeexx-tab-title-${faq.id}`}
                                    style={{ display: openTab === faq.id ? 'block' : 'none' }}
                                >
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
