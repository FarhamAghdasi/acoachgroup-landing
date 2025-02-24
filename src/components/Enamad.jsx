import React, { useEffect, useState } from 'react';

const Enamad = () => {
  const [enamadData, setEnamadData] = useState(null);  // داده‌های انمد
  const [loading, setLoading] = useState(true);  // وضعیت بارگذاری
  const [error, setError] = useState(null);  // وضعیت خطا
  const pageNo = 1;  // شماره صفحه
  const pageSize = 10;  // تعداد داده‌ها در صفحه

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ارسال درخواست به API با استفاده از fetch و متد GET
        const response = await fetch(
          `http://localhost/fieldValue-get?pageNo=${pageNo}&pageSize=${pageSize}`,  // پارامترها در URL
          {
            method: 'GET',  // متد GET
            headers: {
              'domain': 'acoachgroup.com',  // دامنه وبسایت
            },
          }
        );

        // بررسی وضعیت پاسخ
        const data = await response.json();  // تبدیل پاسخ به JSON

        if (data.code === "1" && data.data.length > 0) {
          // جستجو برای فیلد "enamad"
          const enamadItem = data.data.find(item => item.field === "enamad");
          
          if (enamadItem) {
            setEnamadData(enamadItem);  // ذخیره داده‌های مربوط به enamad
          }
          setLoading(false);  // بارگذاری تمام شد
        } else {
          // اگر داده‌ای وجود ندارد یا خطا در دریافت داده‌ها
          setError(data.msg || 'داده‌ای دریافت نشد.');
          setLoading(false);
        }
      } catch (err) {
        setError('خطا در ارسال درخواست: ' + err.message);
        setLoading(false);
      }
    };

    fetchData();  // فراخوانی تابع برای دریافت داده‌ها
  }, [pageNo, pageSize]);  // اینطور که کد فقط زمانی اجرا می‌شود که pageNo یا pageSize تغییر کند

  // اگر در حال بارگذاری هستیم، پیام "در حال بارگذاری..." را نمایش می‌دهیم
  if (loading) return <p>در حال بارگذاری...</p>;

  // اگر خطا وجود داشته باشد، پیام خطا را نمایش می‌دهیم
  if (error) return <p>خطا: {error}</p>;

  // اگر داده‌ها به درستی دریافت شده باشند، آنها را نمایش می‌دهیم
  return (
    <div className="xclf xclf-4x44 e-flex e-con-boxed e-con e-parent" cvc="4x44" mm="container">
      <div className="e-con-inner">
        {enamadData && (
          <div
            className="xclf xclf-b9f70bb ggeexx-widget__width-auto ggeexx-fixed ggeexx-widget ggeexx-widget-image"
            cvc="b9f70bb"
            mm="widget"
            nn="image.default"
          >
            <div className="MKhfd">
              {/* لینک به سایت Enamad */}
              <a href={enamadData.extra || '#'} target="_blank" rel="noopener noreferrer">
                {/* بارگذاری تصویر از فیلد value */}
                <img
                  decoding="async"
                  width="226"
                  height="136"
                  src={enamadData.value || require('../assets/image/3535.png')}  // اگر فیلد value خالی بود، از تصویر پیش‌فرض استفاده می‌شود
                  alt="Enamad"
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enamad;
