import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner1 from '../../assets/banner1.png';
import Banner2 from '../../assets/banner2.png';
import Banner3 from '../../assets/banner3.png';
import Banner4 from '../../assets/banner4.png';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    pauseOnHover: true,
  };

  const images = [Banner2, Banner1, Banner3, Banner4];

  return (
    <div className="w-full max-w-7xl mx-auto md:mt-5 ">
      <Slider {...settings}>
        {images.map((img, i) => (
          <div key={i}>
            <img
              src={img}
              alt={`Slide ${i}`}
              className="
                w-full 
                h-[180px] 
                sm:h-[260px] 
                md:h-[350px] 
                lg:h-[420px]
                xl:h-[480px]
                object-cover 
                md:rounded-md 
                shadow-lg
              "
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
