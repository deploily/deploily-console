"use client";
import { ReactNode } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function HomeCarousel({ children }: { children: ReactNode }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1340 },
      items: 4
    }, md: {
      breakpoint: { max: 1340, min: 1080 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1080, min: 570 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 570, min: 0 },
      items: 1
    }
  };

  return (
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          arrows={true}
          renderArrowsWhenDisabled={false}>
          {children}
        </Carousel>
  );
}
