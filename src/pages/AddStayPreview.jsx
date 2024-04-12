
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AddStayPreview() {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/user/addstay');
  };

  return (

    <div className="welcome-container flex space-between align-center">
      <div className='addstay-details-section'>
        <h3>step 1</h3>
        <h1 className='addstay-preview-second'>Tell us about your place</h1>
        <p className='addstay-preview-description'>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</p>
      </div>

      <div className='video-container'>
        <video src="public/video/addstayvideo.mp4" autoPlay muted loop ></video>
      </div>

      <div className='addstay-footer'>
        <div className='footer-loader' style={{ height: '8px' }}>
          <div className='addstay-loader' style={{ height: "8px", width: "90%" }} ></div>
        </div>

        <div className='footer-btns flex align-center space-between'>
          <button className='addstay-back-btn  '>Back</button>
          <button onClick={handleProceed} className='addstay-next-btn'>Next</button>
        </div>
      </div>
    </div >


  );
}
