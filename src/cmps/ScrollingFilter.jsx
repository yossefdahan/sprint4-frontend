import { useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/styles/cmps/carusel.scss";
import { Navigation, Pagination } from 'swiper';

// Function to dynamically import images
const importImage = (imageName) => {
  // Assumes the build tool can handle these dynamic imports
  return new URL(`../assets/img/icons/${imageName}.jpeg`, import.meta.url).href;
};

export function ScrollingFilter() {
  const labels = [
    'beaches',
    'trending',
    'New',
    'Play',
    'Camping',
    'Houseboats',
    'Trulli',
    'Treehouses',
    'Vineyards',
    'Skiing',
    'Grand pianos',
    'Lake',
    'iconic cities',
    'Boats',
    'Earth homes',
    'OMG!',
    'Off-the-grid',
    'Countryside',
    'Farms',
    'Ryokans',
    'design',
    'Castles',
    'Historical homes',
    'Caves',
    'A-frames',
    'National parks',
    'Amazing views',
    'Lakefront',
    'Islands',
    'Creative spaces',
    'Dammusi',
    'Riads',
    'Windmills',
    'Adapted',
    'Towers',
    'Barns',
    'Minsus',
    'Ski in out',
    'Casas particulares',
    'Shepherds huts',
    'Campers',
    'Arctic',
    'Golfing',
    'Domes',
    'Rooms',
    'Yurts',
    'Bed & breakfasts',
    'Chefs kitchens',
    'Luxe',
    'Hanoks',
    'Top of the world',
    'Cycladic homes',
    'cabins',
    'caravans',
    'kitchens',
    'country side',
    'desert',
    'Amazing pools',

    'shared homes',
    'mansions',
    'national park',
    'island',
    'ski',
    'surfing',
    'Tiny homes',
    'tropical',
    'china',
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (label) => {
    setSearchParams({ type: label });
  };

  return (
    <div className="filter-main">
      <div className="carusel-filter-main">
        <Swiper
          slidesPerView={17}
          spaceBetween={0}
          slidesPerGroup={1}
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
    </div>
  );
}
