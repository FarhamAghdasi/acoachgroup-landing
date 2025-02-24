import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArrowGif from '../assets/image/arrow-animation.gif';

const Banner = () => {
  const [landingPageSection, setLandingPageSection] = useState(null);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const response = await axios.get('http://localhost/section-get', {
          headers: {
            domain: 'acoachgroup.com',
          },
        });

        // فیلتر کردن داده‌ای که position برابر با "landing-page-1" دارد
        const filteredSection = response.data.data.find(
          (section) => section.position === 'landing-page-1'
        );

        setLandingPageSection(filteredSection);
      } catch (error) {
        console.error('Error fetching section data:', error);
      }
    };

    fetchSectionData();
  }, []);

  if (!landingPageSection) {
    // نمایش یک پیام یا یک انیمیشن در هنگام لود شدن داده‌ها
    return <p>Loading...</p>;
  }

  return (
    <div
      className="xclf xclf-318ee9a e-flex e-con-boxed e-con e-parent"
      cvc="318ee9a"
      mm="container"
      sssssss='{"background_background":"classic"}'
    >
      <div className="e-con-inner">
        <div
          key={landingPageSection.id}
          className="xclf xclf-4be4273 e-con-full e-flex e-con e-child"
          cvc="4be4273"
          mm="container"
        >
          <div
            className="xclf xclf-fa78e50 e-con-full e-flex e-con e-child"
            cvc="fa78e50"
            mm="container"
          >
            <div
              className="xclf xclf-a4b88ea ggeexx-widget ggeexx-widget-heading"
              cvc="a4b88ea"
              mm="widget"
              nn="heading.default"
            >
              <div className="MKhfd">
                <span className="ggeexx-heading-title ggeexx-size-default yekanbakh">
                  {landingPageSection.title}
                </span>
              </div>
            </div>
            <div
              className="xclf xclf-dc06f50 ggeexx-widget ggeexx-widget-heading"
              cvc="dc06f50"
              mm="widget"
              nn="heading.default"
            >
              <div className="MKhfd">
                <span className="ggeexx-heading-title ggeexx-size-default">
                  {landingPageSection.shortDesc}
                </span>
              </div>
            </div>
            <div
              className="xclf xclf-e6c2193 e-con-full e-flex e-con e-child"
              cvc="e6c2193"
              mm="container"
            >
              <div
                className="xclf xclf-f3b302a e-transform ggeexx-widget ggeexx-widget-image"
                cvc="f3b302a"
                mm="widget"
                nn="image.default"
              >
                <div className="MKhfd">
                  <img
                    decoding="async"
                    width={200}
                    height={200}
                    src={ArrowGif} // تصویر ثابت
                    className="lazyload"
                    alt=""
                  />
                </div>
              </div>
              <div
                className="xclf xclf-a37f282 ggeexx-mobile-align-justify ggeexx-widget-mobile__width-inherit ggeexx-widget ggeexx-widget-button"
                cvc="a37f282"
                mm="widget"
                nn="button.default"
              >
                <div className="MKhfd">
                  <div className="ggeexx-button-wrapper">
                    <a
                      className="ggeexx-button ggeexx-button-link ggeexx-size-sm"
                      href={landingPageSection.btnurl} // لینک از API
                      target="_blank"
                    >
                      <span className="ggeexx-button-content-wrapper">
                        <span className="ggeexx-button-text">
                          {landingPageSection.btntitle}
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="xclf xclf-f3b302a newwww e-transform ggeexx-widget ggeexx-widget-image"
                cvc="f3b302a"
                mm="widget"
                nn="image.default"
              >
                <div className="MKhfd">
                  <img
                    decoding="async"
                    width={200}
                    height={200}
                    src={ArrowGif} // تصویر ثابت
                    className="lazyload"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
