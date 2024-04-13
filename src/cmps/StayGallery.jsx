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

  const HeartOutlineIcon = () => (
    <svg
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='presentation'
      focusable='false'
      className='heart-icon'
    >
      <path d='m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z'></path>
    </svg>
  );

  const HeartFillIcon = () => (
    <svg
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='presentation'
      focusable='false'
      className='heart-icon'
    >
      <path
        fill='#FF385C'
        d='m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z'
      ></path>
    </svg>
  );

  return (
    <div className="stay-gallery">
      <Link className="img-link" to={`/stay/${stayId}`}>
        <img className='img-gallery' src={imgUrls[currentImgIndex]} alt="Stay" /></Link>
      < i onClick={handleSaveClick} >{isSaved ? <HeartFillIcon /> : <HeartOutlineIcon />}</i>

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
