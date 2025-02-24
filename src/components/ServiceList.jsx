import React, { useState, useEffect } from 'react';
import ArrowGif from '../assets/image/arrow-animation.gif';
import axios from 'axios';
import world from '../assets/image/world-image.png';
import ImageOptimize from './Image';

const ServiceList = () => {
    const [serviceData, setServiceData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchLandingImage = async () => {
            try {
                const response = await fetch('http://localhost/fieldValue-get', {
                    method: 'POST',
                    headers: {
                        "domain": "acoachgroup.com",
                    },
                    body: JSON.stringify({
                        pageNo: 1,
                        pageSize: 10,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const signupField = data?.data?.find(item => item.field === 'landing-image');
                    if (signupField) {
                        setImageSrc(signupField.value);
                    }
                } else {
                    setErrorMessage("مشکلی در دریافت داده‌ها وجود دارد.");
                }
            } catch (error) {
                setErrorMessage("خطا در اتصال به API.");
                console.error("خطا:", error);
            }
        };

        fetchLandingImage();

        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost/service-get?pageNo=1&pageSize=6', {
                    method: 'GET',
                    headers: {
                        'domain': 'acoachgroup.com', // دامنه API
                    },
                });

                const result = await response.json();

                if (result.code === "1") {
                    // فیلتر کردن خدماتی که اسم آنها شامل 'landing' باشد
                    const filteredServices = result.data.filter(service =>
                        service.title.includes('لندینگ'),
                    );

                    // انتخاب 4 سرویس اول از فیلتر شده‌ها
                    setServices(filteredServices.slice(0, 4));
                } else {
                    setError("خطا در دریافت اطلاعات");
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    return (
        <div className="xclf xclf-ede4c4e e-con-full e-flex e-con e-child" cvc="ede4c4e" mm="container">
            <div className="xclf xclf-4fa5136 e-con-full e-flex e-con e-child" cvc="4fa5136" mm="container" sssssss='{"background_background":"classic"}'>
                <div className="xclf xclf-7c77620 e-flex e-con-boxed e-con e-child" cvc="7c77620" mm="container">
                    <div className="e-con-inner new-settings">
                        <ImageOptimize />
                        <div className="xclf xclf-0bdf63f e-con-full e-flex e-con e-child" cvc="0bdf63f" mm="container">
                            <div className="xclf xclf-106a5b2 ggeexx-widget ggeexx-widget-image" cvc="106a5b2" mm="widget" nn="image.default">
                                <div className="ggeexx-widget-container">
                                    {imageSrc ? (
                                        <img width={1024} height={497} className="lazyloaded" src={imageSrc} alt="Landing Image" />
                                    ) : (
                                        <p>در حال بارگذاری تصویر...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="xclf xclf-9c4ff5b e-con-full e-flex e-con e-child" cvc="9c4ff5b" mm="container">
  <div className="e-con-inner">
    {services.length > 0 ? (
      <div className="service-rows">
        {/* ردیف اول */}
        <div className="service-row">
          {services.slice(0, 2).map((service, index) => (
            <div key={index} className="service-item">
              <div className="xclf xclf-d10f600 e-con-full e-flex e-con e-child" cvc="d10f600" mm="container" sssssss='{"background_background":"classic"}'>
                <div className="xclf xclf-64a0aff ggeexx-view-default ggeexx-position-top ggeexx-mobile-position-top ggeexx-widget ggeexx-widget-icon-box" cvc="64a0aff" mm="widget" nn="icon-box.default">
                  <div className="ggeexx-widget-container">
                    <div className="ggeexx-icon-box-wrapper">
                      <div className="ggeexx-icon-box-icon">
                        <span className="ggeexx-icon ggeexx-animation-">
                          <i aria-hidden="true" className="fas fa-truck-loading" />
                        </span>
                      </div>
                      <div className="ggeexx-icon-box-content">
                        <h3 className="ggeexx-icon-box-title">
                          <span>{service.name}</span>
                        </h3>
                        <p className="ggeexx-icon-box-description">{service.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ردیف دوم */}
        <div className="service-row">
          {services.slice(2, 4).map((service, index) => (
            <div key={index} className="service-item">
              <div className="xclf xclf-d10f600 e-con-full e-flex e-con e-child" cvc="d10f600" mm="container" sssssss='{"background_background":"classic"}'>
                <div className="xclf xclf-64a0aff ggeexx-view-default ggeexx-position-top ggeexx-mobile-position-top ggeexx-widget ggeexx-widget-icon-box" cvc="64a0aff" mm="widget" nn="icon-box.default">
                  <div className="ggeexx-widget-container">
                    <div className="ggeexx-icon-box-wrapper">
                      <div className="ggeexx-icon-box-icon">
                        <span className="ggeexx-icon ggeexx-animation-">
                          <i aria-hidden="true" className="fas fa-truck-loading" />
                        </span>
                      </div>
                      <div className="ggeexx-icon-box-content">
                        <h3 className="ggeexx-icon-box-title">
                          <span>{service.name}</span>
                        </h3>
                        <p className="ggeexx-icon-box-description">{service.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p>در حال بارگذاری خدمات...</p>
    )}
  </div>
</div>

        </div>
    );
};

export default ServiceList;
