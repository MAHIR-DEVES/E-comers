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
    dots: true, // নিচে ডট দেখাবে
    infinite: true, // লুপ চলবে
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Auto scroll হবে
    autoplaySpeed: 3000,
    arrows: true, // next prev arrow
  };

  const images = [Banner2, Banner1, Banner3, Banner4];

  return (
    <div className="w-full max-w-7xl mx-auto mt-5">
      <Slider {...settings}>
        {images.map((img, i) => (
          <div key={i}>
            <img
              src={img}
              alt={`Slide ${i}`}
              className="w-full h-[400px] object-cover rounded-2xl"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
