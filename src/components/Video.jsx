import React from 'react'
import Service from "./ServiceList"
import Faq from "./FAQ-sec"
import Contact from "./Contact1"

const Video = () => {
  return (
    <div
      className="xclf xclf-b91ec14 e-flex e-con-boxed e-con e-parent"
      cvc="b91ec14"
      mm="container"
      sssssss='{"background_background":"classic"}'
    >
      <div className="e-con-inner">

        <Service />
        <div
          className="xclf xclf-000ae7b e-con-full e-flex e-con e-child"
          cvc="000ae7b"
          mm="container"
          id='sigma'
        >
          <Faq />
          <Contact/>
        </div>
      </div>
    </div>

  )
}


export default Video