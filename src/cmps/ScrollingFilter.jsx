import { useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/styles/cmps/carusel.scss";
import { Navigation, Pagination } from 'swiper';
import { stayService } from '../services/stay.service';
import { setFilterBy } from '../store/stay.actions';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FilterModal } from './FilterModal';


const importImage = (imageName) => {

  return new URL(`../assets/img/icons/${imageName}.jpeg`, import.meta.url).href
}

export function ScrollingFilter() {
  const [isOpen, setIsOpen] = useState(false)
  const labels = stayService.getLabels()
  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedLabel, setSelectedLabel] = useState(null)


  const handleChange = (label) => {
    if (selectedLabel === label) {
      setSearchParams({})
      setFilterBy({ ...filterBy, labels: null })
      setSelectedLabel(null)
    } else {
      setSearchParams({ labels: label })
      setFilterBy({ ...filterBy, labels: label })
      setSelectedLabel(label)
    }
  }
  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }


  return (
    // <div className="filter-main flex">
    <section className="carusel-filter-main-container">
    <div className="carusel-filter-main">
      {/* <hr className="hr-line" /> */}
      <Swiper
        // observer={true}
        // observeParents={true}
        slidesPerView={26}
        spaceBetween={0}
        slidesPerGroup={14}
        // loopFillGroupWithBlank={false}
        // pagination={{
        //   clickable: true,
        // }}


        navigation={true}

        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          // Adjust these values as needed for your layout
          200: {
            slidesPerView: 3,
            slidesPerGroup: 1,
          },
          500: {
            slidesPerView: 4,
            slidesPerGroup: 1,
          },
          600: {
            slidesPerView: 5,
            slidesPerGroup: 2,
          },
          700: {
            slidesPerView: 8,
            slidesPerGroup: 4,
          },
          768: {
            slidesPerView: 11,
            slidesPerGroup: 5,
          },
          1024: {
            slidesPerView: 14,
            slidesPerGroup: 5,
          },
          1440: {
            slidesPerView: 20,
            slidesPerGroup: 6,
          }
        }}
      >
        {
          labels.map(label => (
            <SwiperSlide key={label} onClick={() => handleChange(label)} >
              <button className={selectedLabel === label ? 'active' : ''}>
                <span>
                  <img src={importImage(label.toLowerCase())} />
                </span>
                <span className='label-name ' style={{
                  borderBottom: selectedLabel === label ? '2px solid black' : '',
                  fontWeight: selectedLabel === label ? '700' : '',
                }} >{label}</span>
              </button>
            </SwiperSlide>
          ))
        }
      </Swiper>

      <div className='filter-small-scrolling'>
        <button onClick={() => setIsOpen(!isOpen)} className='filter-small-btn'> <img src="https://res.cloudinary.com/dheh8zkmv/image/upload/v1713336806/xti0ctvlmmuturuo29hj.svg" alt="" /> Filters </button>
      </div>
      {isOpen ? <FilterModal setIsOpen={setIsOpen} isOpen={isOpen} filterBy={filterBy} onSetFilter={onSetFilter} /> : ''}
    </div >
     </section >

  )
}
