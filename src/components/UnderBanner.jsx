import React, { useState, useEffect } from "react";
import Image1 from "../assets/image/arrow-animation.gif";
import axios from "axios";

const UnderBanner = () => {
  const [sectionData, setSectionData] = useState([]);

  const images = [
    { id: "897b377" },
    { id: "463c62e" },
    { id: "e369a3c" },
    { id: "4a2eb33" },
    { id: "4237abd" },
    { id: "96fcd92" },
    { id: "c1db3e5" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost/section-get",
          {
            headers: {
              domain: "acoachgroup.com",
            },
          }
        );

        if (response.data.code === "1") {
          const landingSections = response.data.data.filter(
            (section) => section.position === "Landing-page-2"
          );
          setSectionData(landingSections);
        }
      } catch (error) {
        console.error("Error fetching section data:", error);
      }
    };

    fetchData();
  }, []);

  if (sectionData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="elm-elm elm-elm-a7fff5e e-flex e-con-boxed e-con e-parent">
      <div className="e-con-inner">
        <div className="elm-elm elm-elm-d4b3a1a e-flex e-con-boxed e-con e-child">
          <div className="e-con-inner">
            <div className="elm-elm elm-elm-beb2f33 e-con-full e-flex e-con e-child">
              <div className="elm-elm elm-elm-a60136e e-con-full e-flex e-con e-child">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="elm-elm el4m-widget el4m-widget-image"
                    data-id={image.id}
                    data-element_type="widget"
                    nn="image.default"
                  >
                    <div className="el4m-widget-container">
                      <img
                        decoding="async"
                        width={200}
                        height={200}
                        src={Image1}
                        className="attachment-large size-large wp-image-260"
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="elm-elm elm-elm-fbbc7a6 e-con-full e-flex e-con e-child">
                {sectionData.map((section) => (
                  <div key={section.id}>
                    <div
                      className="elm-elm elm-elm-b6ea67e el4m-widget el4m-widget-heading"
                      data-id="b6ea67e"
                      data-element_type="widget"
                      nn="heading.default"
                    >
                      <div className="el4m-widget-container">
                        <span className="el4m-heading-title el4m-size-default">
                          {section.title || "بدون عنوان"}
                        </span>
                      </div>
                    </div>

                    <div
                      className="elm-elm elm-elm-f54dbcd el4m-widget el4m-widget-shortcode"
                      data-id="f54dbcd"
                      data-element_type="widget"
                      nn="shortcode.default"
                    >
                      <div className="el4m-widget-container">
                        <div className="el4m-shortcode">
                          <p>{section.shortDesc || "بدون توضیح کوتاه"}</p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="elm-elm elm-elm-4784375 el4m-align-justify el4m-widget el4m-widget-button"
                      data-id="4784375"
                      data-element_type="widget"
                      nn="button.default"
                    >
                      <div className="el4m-widget-container">
                        <div className="el4m-button-wrapper">
                          <a
                            className="el4m-button el4m-button-link el4m-size-sm"
                            href={section.btnurl || "#"}
                          >
                            <span className="el4m-button-content-wrapper">
                              <span className="el4m-button-icon">
                                <svg
                                  aria-hidden="true"
                                  className="e-font-icon-svg e-fas-angle-left"
                                  viewBox="0 0 256 512"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path>
                                </svg>
                              </span>
                              <span className="el4m-button-text">
                                {section.btntitle || "مشاهده جزئیات"}
                              </span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderBanner;
