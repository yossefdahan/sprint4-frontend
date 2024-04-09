import { useState } from 'react'
import { Link } from "react-router-dom"
export function StayGallery({ stayId, imgUrls, isSaved, onSave }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  const nextImg = (ev) => {
    ev.stopPropagation();
    setCurrentImgIndex((prevIndex) => (prevIndex + 1) % imgUrls.length);
  };

  const prevImg = (ev) => {
    ev.stopPropagation();
    setCurrentImgIndex((prevIndex) => (prevIndex - 1 + imgUrls.length) % imgUrls.length);
  };

  const handleSaveClick = (ev) => {
    ev.stopPropagation();
    onSave(ev);
  };



  return (
    <div className="stay-gallery">
      <Link className="img-link" to={`/stay/${stayId}`}>
        <img className='img-gallery' src={imgUrls[currentImgIndex]} alt="Stay" /></Link>
      <i
        className={`fa-duotone fa-heart  ${isSaved ? 'fas' : 'far'}`}
        onClick={handleSaveClick}
      ></i>
      <section className='btn-preview'>
        {imgUrls[currentImgIndex] !== imgUrls[0] ? <button className=" btn-nav-img prev" onClick={prevImg}></button> : <span></span>}
        <button className="btn-nav-img  next" onClick={nextImg}></button>
      </section>
      <div className="image-counter">
        {imgUrls.map((url, index) => (
          <div
            key={index}
            className={`dot ${index === currentImgIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div >
  );

}
