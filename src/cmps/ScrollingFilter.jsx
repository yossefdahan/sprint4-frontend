import { useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/styles/cmps/carusel.scss";
import { Navigation, Pagination } from 'swiper';
import { stayService } from '../services/stay.service.local';
import { setFilterBy } from '../store/stay.actions';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const importImage = (imageName) => {

  return new URL(`../assets/img/icons/${imageName}.jpeg`, import.meta.url).href
}

export function ScrollingFilter() {
  const labels = stayService.getLabels()
  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
  const [searchParams, setSearchParams] = useSearchParams()



  const handleChange = (label) => {
    setSearchParams({ labels: label })
    setFilterBy({ ...filterBy, labels: label })
  }

  return (
    <div className="filter-main flex">
      <hr className="hr-line" />
      <div className="carusel-filter-main ">
        <Swiper
          slidesPerView={16}
          spaceBetween={0}
          slidesPerGroup={10}
          loopFillGroupWithBlank={false}
          // pagination={{
          //   clickable: true,
          // }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {labels.map(label => (
            <SwiperSlide key={label} onClick={() => handleChange(label)}>
              <button>
                <span>
                  {/* Using importImage function to get image URL */}
                  <img src={importImage(label.toLowerCase())} alt={label} />
                </span>
                <span className='label-name'>{label}</span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='filter-small-scrolling'>
        <button className='filter-small-btn'> <img src="src/assets/img/small-icons/filter.svg" alt="" /> Filters </button>
      </div>
    </div>

  )
}
