import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contact2 = () => {
  const [error, setError] = useState(null);
  const [contactData, setContactData] = useState([]);
  const [pageNo, setPageNo] = useState(1); // شماره صفحه
  const [pageSize] = useState(10); // تعداد آیتم‌ها در هر صفحه

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        // ایجاد فرم دیتا
        const formData = new FormData();
        formData.append('pageNo', pageNo);
        formData.append('pageSize', pageSize);

        const response = await axios.post('http://localhost/fieldValue-get', formData, {
          headers: {
            domain: 'acoachgroup.com',
          },
        });

        if (response.data.code === 1) {
          setContactData(response.data.data);
        } else {
          setError(response.data.msg || 'خطایی در دریافت اطلاعات رخ داده است.');
        }
      } catch (err) {
        setError('خطا در ارتباط با سرور.');
        console.error('Error fetching contact data:', err);
      }
    };

    fetchContactData();
  }, [pageNo, pageSize]);

  return (
    <div class="xclf xclf-efe69fd e-con-full e-flex e-con e-child" cvc="efe69fd" mm="container" sssssss="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div
        className="xclf xclf-efe69fd e-con-full e-flex e-con e-child"
        cvc="efe69fd"
        mm="container"
        sssssss='{"background_background":"classic"}'
      >
        {/* عنوان */}
        <div
          className="xclf xclf-96458ad ggeexx-widget ggeexx-widget-heading"
          cvc="96458ad"
          mm="widget"
          nn="heading.default"
        >
          <div className="MKhfd">
            <h3 className="ggeexx-heading-title ggeexx-size-default">
              {contactData.find((field) => field.field === 'landing-contact-title')?.value || 'عنوان پیش‌فرض'}
            </h3>
          </div>
        </div>

        {/* توضیحات */}
        <div
          className="xclf xclf-5233bee ggeexx-widget ggeexx-widget-text-editor"
          cvc="5233bee"
          mm="widget"
          nn="text-editor.default"
        >
          <div className="MKhfd">
            <p>
              <span className="colorsigma">
                <strong>
                  {contactData.find((field) => field.field === 'landing-contact-intro')?.value || 'توضیحات اولیه'}
                </strong>
              </span>
            </p>
            {contactData
              .filter((field) => field.field === 'reason')
              .map((item, index) => (
                <p key={index}>{item.value}</p>
              ))}
            <p>
              <span className="color2">
                {contactData.find((field) => field.field === 'landing-contact-call_to_action')?.value ||
                  'شماره خود را وارد کنید تا ما با شما تماس بگیریم.'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact2;
