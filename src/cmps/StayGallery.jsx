import { useState } from 'react'

export function StayGallery({ imgUrls, isSaved, onSave }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  const nextImg = () => {
    setCurrentImgIndex((prevIndex) => (prevIndex + 1) % imgUrls.length)
  }

  const prevImg = () => {
    setCurrentImgIndex((prevIndex) => (prevIndex - 1 + imgUrls.length) % imgUrls.length)
  }

  const handleSaveClick = (ev) => {
    ev.stopPropagation();
    onSave();
  };

  return (
    <div className="stay-gallery">
      <img className='img-gallery ' src={imgUrls[currentImgIndex]} alt="Stay" />
      <i
        className={`fa-duotone fa-heart  ${isSaved ? 'fas' : 'far'}`}
        onClick={handleSaveClick}

      ></i>
      <section className='btn-preview'>
        {/* <button onClick={prevImg}>Prev</button>
      <button onClick={nextImg}>Next</button> */}
      </section>
    </div>
  )
}
