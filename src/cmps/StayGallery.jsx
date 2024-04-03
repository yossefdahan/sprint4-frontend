import  { useState } from 'react'

export function StayGallery({ imgUrls }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  const nextImg = () => {
    setCurrentImgIndex((prevIndex) => (prevIndex + 1) % imgUrls.length)
  }

  const prevImg = () => {
    setCurrentImgIndex((prevIndex) => (prevIndex - 1 + imgUrls.length) % imgUrls.length)
  }

  return (
    <div className="stay-gallery">
      <img src={imgUrls[currentImgIndex]} alt="Stay" />
      <section className='btn-preview'>
      <button onClick={prevImg}>Prev</button>
      <button onClick={nextImg}>Next</button>
      </section>
    </div>
  )
}
