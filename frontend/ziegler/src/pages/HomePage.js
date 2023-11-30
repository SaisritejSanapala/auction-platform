import React from 'react';

import video from '../video/video.mp4'
const HomePage = () => {
  return (
    <div className=''>
      <video  autoPlay loop muted style={{width: 100 + "vw", height: 100 + "vh", overflow: 'hidden'}}>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomePage;
