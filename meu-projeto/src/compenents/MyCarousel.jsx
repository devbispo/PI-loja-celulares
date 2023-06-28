import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from '../img/img1.png';
import img2 from '../img/img2.png';
import img3 from '../img/img3.png';

export const MyCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Carousel selectedItem={activeSlide}>
      <div className="slide">
        <img src={img1} alt="Slide 1" />
        <p className="legend">Aproveite, semana dos namorados, não perca as promoções.</p>
      </div>
      <div className="slide">
        <img src={img2} alt="Slide 2" />
        <p className="legend">Temos diversas opções, tanto para seu namorado(a) que é capitalista e ama um Iphone. </p>
      </div>
      <div className="slide">
        <img src={img3} alt="Slide 3" />
        <p className="legend">Quanto para seu namorado que é socialista e adora um produto "Made in China"</p>
      </div>
    </Carousel>
  );
};
