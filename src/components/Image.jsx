import React from 'react';
import ArrowGif from '../assets/image/arrow-animation.gif'

const images = [
    { id: "c3fd3de", src: ArrowGif },
    { id: "3389044", src: ArrowGif },
    { id: "80c94da", src: ArrowGif },
    { id: "11a041d", src: ArrowGif }
  ];
  
  const ImageWidget = ({ src, id }) => (
    <div className={`xclf xclf-${id} e-con-full e-flex e-con e-child`} cvc={id} mm="container">
      <div className="xclf xclf-widget ggeexx-widget ggeexx-widget-image" mm="widget" nn="image.default">
        <div className="MKhfd">
          <img
            src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs="
            decoding="async"
            width={200}
            height={200}
            data-src={src}
            className="lazyload"
            alt=""
          />
          <noscript>
            <img decoding="async" width="200" height="200" src={src} className="lazyload" alt="" />
          </noscript>
        </div>
      </div>
    </div>
  );
  
  const OptimizedImageWidgets = () => (
    <>
      {images.map((image, index) => (
        <ImageWidget key={index} id={image.id} src={image.src} />
      ))}
    </>
  );
  
  export default OptimizedImageWidgets;
  