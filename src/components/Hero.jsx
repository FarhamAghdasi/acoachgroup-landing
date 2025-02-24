import React , {useState , useEffect} from 'react'
import axios from 'axios';
import VideoImage from '../assets/image/hero-image.jpg'

const Hero = () => {
  const [error, setError] = useState(null);
  const [videoData, setVideoData] = useState(null);


  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get('http://localhost/video-get', {
          headers: {
            domain: 'acoachgroup.com',
          },
        });
          const validVideos = response.data.data[1];
          setVideoData(validVideos);
      } catch (err) {
        setError('خطا در دریافت اطلاعات ویدئو.');
        console.error('Error fetching video data:', err);
      }
    };
  
    fetchVideoData();
  }, []);


  if (error) {
    return <p>{error}</p>;
  }

  if (!videoData) {
    return <p>در حال بارگذاری ویدئو...</p>;
  }
  return (
    <>
        <div
      className="xclf xclf-4086c3b ggeexx-widget ggeexx-widget-heading"
      cvc="4086c3b"
      mm="widget"
      nn="heading.default"
    >
      <div className="MKhfd">
        <span className="ggeexx-heading-title ggeexx-size-default">
          {videoData.title}
        </span>
      </div>
    </div>
    <div
      className="xclf xclf-80dfdc3 ggeexx-widget ggeexx-widget-heading"
      cvc="80dfdc3"
      mm="widget"
      nn="heading.default"
    >
      <div className="MKhfd">
        <span className="ggeexx-heading-title ggeexx-size-default">
        {videoData.description}
        </span>
      </div>
    </div>
    <div
      className="xclf xclf-3e202bf e-con-full e-flex e-con e-child"
      cvc="3e202bf"
      mm="container"
    >
      <div
        className="xclf xclf-d1c36ad ggeexx-widget ggeexx-widget-video"
        cvc="d1c36ad"
        mm="widget"
        sssssss='{"video_type":"hosted","controls":"yes"}'
        nn="video.default"
      >
        <div className="MKhfd">
        <div className="e-hosted-video ggeexx-wrapper ggeexx-open-inline">
        <video
      className="ggeexx-video"
      src={`http://localhost/${videoData.video}`} // لینک ویدئو از API
      controls
      preload="metadata" // تغییر preload به metadata
      controlsList="nodownload"
      poster={videoData.cover} // پوستر از API
      onError={(e) => console.error('Video not found:', e.target.src)} // بررسی خطا
    >
      <track kind="captions" srcLang="fa" />
      Your browser does not support the video tag.
    </video>
    </div>
        </div>
      </div>
    </div>
    </>

  )
}

export default Hero