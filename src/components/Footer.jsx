import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.post(
          "http://localhost/fieldValue-get",
          {
            pageNo: 1, // شماره صفحه
            pageSize: 1, // تعداد داده‌ها در صفحه
          },
          {
            headers: {
              domain: "acoachgroup.com", // دامنه وبسایت
            },
          }
        );

        // استخراج داده‌ها از API
        const supportLink = response.data?.data?.find(
          (item) => item.field === "support_telegram_link"
        );
        const supportNumber = response.data?.data?.find(
          (item) => item.field === "support_telegram_number"
        );
        const supportText = response.data?.data?.find(
          (item) => item.field === "support_telegram_text"
        );

        if (supportLink && supportNumber && supportText) {
          setFooterData({
            supportLink: supportLink.value,
            supportNumber: supportNumber.value,
            supportText: supportText.value, // متن پشتیبانی
          });
        } else {
          console.error("داده‌های پشتیبانی یافت نشد!");
        }
      } catch (error) {
        console.error("خطا در دریافت داده‌های فوتر از API:", error);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) {
    return <div>در حال دریافت اطلاعات...</div>;
  }

  return (
    <div className="xclf xclf-5x55 e-flex e-con-boxed e-con e-parent" cvc="5x55" mm="container">
      <div className="e-con-inner">
        <div className="xclf xclf-3733d3a ggeexx-align-justify ggeexx-widget__width-inherit ggeexx-fixed ggeexx-widget ggeexx-widget-button" cvc="3733d3a" mm="widget" sssssss='{"_position":"fixed"}' nn="button.default">
          <div className="MKhfd">
            <div className="ggeexx-button-wrapper">
              <a className="ggeexx-button ggeexx-button-link ggeexx-size-sm" href={footerData.supportLink} target="_blank" rel="nofollow">
                <span className="ggeexx-button-content-wrapper">
                  <span className="ggeexx-button-icon">
                    <i aria-hidden="true" className="fab fa-telegram" />{" "}
                  </span>
                  <span className="ggeexx-button-text">
                    {footerData.supportText} : <a href={footerData.supportLink}>{footerData.supportNumber}</a>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
