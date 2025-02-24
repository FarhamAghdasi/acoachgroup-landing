import React, { useEffect, useState } from "react";
import axios from "axios";

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState(null); // تاریخ هدف
  const [timeLeft, setTimeLeft] = useState(null); // زمان باقی‌مانده

  // تابع برای محاسبه زمان باقی‌مانده
  const calculateTimeLeft = (target) => {
    const now = new Date();
    const difference = new Date(target) - now;

    if (difference <= 0) {
      return null; // زمان تمام شده است
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  useEffect(() => {
    const fetchTargetDate = async () => {
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

        // استخراج تاریخ هدف از آرایه data
        const targetField = response.data?.data?.find(
          (item) => item.field === "countdown_target_date"
        );

        if (targetField && targetField.value) {
          setTargetDate(targetField.value);
        } else {
          console.error("تاریخ هدف یافت نشد!");
        }
      } catch (error) {
        console.error("خطا در دریافت تاریخ هدف از API:", error);
      }
    };

    fetchTargetDate();
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer); // پاک کردن تایمر هنگام Unmount
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="ggeexx-countdown-wrapper">
        {targetDate ? (
          <p>زمان به پایان رسیده است!</p>
        ) : (
          <p>در حال دریافت اطلاعات...</p>
        )}
      </div>
    );
  }

  return (
    <div className="ggeexx-countdown-wrapper">
      <div className="ggeexx-countdown-item">
        <span className="ggeexx-countdown-digits">{timeLeft.days}</span>{" "}
        <span className="ggeexx-countdown-label">روز</span>
      </div>
      <div className="ggeexx-countdown-item">
        <span className="ggeexx-countdown-digits">{timeLeft.hours}</span>{" "}
        <span className="ggeexx-countdown-label">ساعت</span>
      </div>
      <div className="ggeexx-countdown-item">
        <span className="ggeexx-countdown-digits">{timeLeft.minutes}</span>{" "}
        <span className="ggeexx-countdown-label">دقیقه</span>
      </div>
      <div className="ggeexx-countdown-item">
        <span className="ggeexx-countdown-digits">{timeLeft.seconds}</span>{" "}
        <span className="ggeexx-countdown-label">ثانیه</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
