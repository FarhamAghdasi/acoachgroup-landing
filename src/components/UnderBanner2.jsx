import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ImageURL from '../assets/image/bg-image.jpg'
import Image1 from '../assets/image/arrow-animation.gif'


const UnderBanner2 = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState(null);


    const [videos, setvideos] = useState(null);


    useEffect(() => {
        const fetchvideos = async () => {
          try {
            const response = await axios.get('http://localhost/video-get', {
              headers: {
                domain: 'acoachgroup.com',
              },
            });
      
            // پیدا کردن ویدئوی با position برابر Landing-video-1
            const landingVideo = response.data.data.find(
              (video) => video.position === 'Landing-video-1'
            );
      
            if (landingVideo) {
              setvideos(landingVideo); // فقط ویدیوی مورد نظر ذخیره می‌شود
            } else {
              setError('ویدئوی با موقعیت Landing-video-1 یافت نشد.');
            }
          } catch (err) {
            setError('خطا در دریافت اطلاعات ویدئو.');
            console.error('Error fetching video data:', err);
          }
        };
      
        fetchvideos();
      }, []);
      
  
  
    if (error) {
      return <p>{error}</p>;
    }
  
    if (!videos) {
      return <p>در حال بارگذاری ویدئو...</p>;
    }


    const renderImageContainer = (id) => (
        <div
          className="elm-elm elm-elm-5c13561 e-con-full e-flex e-con e-child"
          data-id={id}
          data-element_type="container"
        >
          <div
            className="elm-elm elm-elm-f1dcc85 el4m-widget el4m-widget-image"
            data-id={`${id}-widget`}
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
        </div>
      );



    const handlePlayClick = (video) => {
        setCurrentVideo(video);
        setImageURL(video.cover); // برای پس‌زمینه پوستر ویدیو
        setIsPlaying(true);
    };

    return (
        <div
            className="elm-elm elm-elm-910b518 e-flex e-con-boxed e-con e-parent"
            data-id="910b518"
            data-element_type="container"
            data-settings='{"background_background":"classic"}'

        >
            <div className="e-con-inner">
            <div className="elm-elm elm-elm-33a9959 e-con-full e-flex e-con e-child" data-id="33a9959" data-element_type="container" data-settings='{"background_background":"classic"}'>
            {/* نمایش عنوان */}
            <div className="elm-elm elm-elm-38105cb el4m-widget el4m-widget-heading" data-id="38105cb" data-element_type="widget" nn="heading.default">
                <div className="el4m-widget-container">
                    <span className="el4m-heading-title el4m-size-default">{videos.title}</span>
                </div>
            </div>

            {/* نمایش ویدیوها */}
                <div
                    key={videos.id}
                    className="elm-elm elm-elm-7d54ec4 el4m-widget el4m-widget-video"
                    data-id={videos.id}
                    data-element_type="widget"
                    data-settings={`{"video_type":"hosted","image_overlay":{"url":"${videos.cover}","id":745,"source":"library"},"show_image_overlay":"yes","controls":"yes"}`}
                >
                    <div className="el4m-widget-container">
                        <div className="e-hosted-video el4m-wrapper el4m-open-inline">
                            {isPlaying && currentVideo?.id === videos.id ? (
                                <video
                                    className="el4m-video"
                                    src={`http://localhost/${videos.video}`} // لینک ویدیو از API
                                    controls
                                    preload="metadata"
                                    controlsList="nodownload"
                                />
                            ) : (
                                <div
                                    className="el4m-custom-embed-image-overlay"
                                    style={{
                                        backgroundImage: `url(${videos.cover})`,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handlePlayClick(videos)} // کلیک برای شروع ویدیو
                                >
                                    <div className="el4m-custom-embed-play" role="button" aria-label="پخش ویدیو" tabIndex={0}>
                                        <svg aria-hidden="true" className="e-font-icon-svg e-eicon-play" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M838 162C746 71 633 25 500 25 371 25 258 71 163 162 71 254 25 367 25 500 25 633 71 746 163 837 254 929 367 979 500 979 633 979 746 933 838 837 929 746 975 633 975 500 975 367 929 254 838 162M808 192C892 279 933 379 933 500 933 621 892 725 808 808 725 892 621 938 500 938 379 938 279 896 196 808 113 725 67 621 67 500 67 379 108 279 196 192 279 108 383 62 500 62 621 62 721 108 808 192M438 392V642L642 517 438 392Z"></path>
                                        </svg>
                                        <span className="el4m-screen-only">پخش ویدیو</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
        </div>
                <div
                    className="elm-elm elm-elm-501a46a e-con-full e-flex e-con e-child"
                    data-id="501a46a"
                    data-element_type="container"
                    data-settings='{"background_background":"classic"}'
                >
                    <div
                        className="elm-elm elm-elm-0f0bdc3 e-flex e-con-boxed e-con e-child"
                        data-id="0f0bdc3"
                        data-element_type="container"
                    >
                                <div className="dade e-con-inner">
  {["5c13561", "e9d74b8", "0e2e8f4", "312742b"].map((id) =>
    renderImageContainer(id)
  )}
</div>
                    </div>
                    <div
            className="elm-elm elm-elm-13f66a2 e-flex e-con-boxed e-con e-child"
            data-id="13f66a2"
            data-element_type="container"
            data-settings='{"background_background":"classic"}'
        >
            <div className="e-con-inner">
                {/* عنوان اصلی */}
                    <h2 className="el4m-heading-title el4m-size-default">
                        {videos.description}
                    </h2>
            </div>
        </div>
                </div>
            </div>
        </div>
    )
}

export default UnderBanner2