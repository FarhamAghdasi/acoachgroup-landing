import React, { useEffect } from 'react';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange'; // اگر به پلاگین تغییرات نیاز دارید
import 'lazysizes/plugins/parent-fit/ls.parent-fit'; // اگر به پلاگین parent-fit نیاز دارید

import {
  Banner,
  Contact,
  Enamad,
  Footer,
  Hero,
  Star,
  Star2,
  Star3,
  Contact1,
  Contact2,
  Video,
  UnderBanner,
  UnderBanner2
} from './components';



function App() {
  return(
    <>
        <div
  className="xclf xclf-dba56fb e-flex e-con-boxed e-con e-parent"
  cvc="dba56fb"
  mm="container"
  sssssss='{"background_background":"classic"}'
>
  <div className="e-con-inner">


    <Hero />
    <div className='xclf xclf-d795747 e-con-full e-flex e-con e-child' cvc="d795747" mm="container">
    <Contact2 />
    <Contact1 />
    </div>

    </div></div>

    <Star />
    <Banner />
    <Star2 />
    <div
  data-el4m-type="wp-page"
  data-el4m-id={253}
  className="elementor el4m-253"
  data-el4m-post-type="page"
>
    <UnderBanner />
    <UnderBanner2 />
    </div>
    <Star2 />
    <Video />
    <Contact />
    <Enamad />
    <Footer />
    </>
  );
}

export default App;
