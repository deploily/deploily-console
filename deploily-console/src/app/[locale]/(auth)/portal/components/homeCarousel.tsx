"use client";
import { Grid } from "antd";
import { ReactNode } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function HomeCarousel({ children }: { children: ReactNode }) {
  const screens = Grid.useBreakpoint();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 4,
      partialVisibilityGutter: 40
    },
    l: {
      breakpoint: { max: 1400, min: 1200 },
      items: 3,
      partialVisibilityGutter: 40
    },
    md: {
      breakpoint: { max: 1200, min: 1100 },
      items: 3,
      partialVisibilityGutter: 10
    },
    tablet: {
      breakpoint: { max: 1100, min: 650 },
      items: 2,
      partialVisibilityGutter: 38
    },
    sm: {
      breakpoint: { max: 650, min: 570 },
      items: 2,
      partialVisibilityGutter: -10
    },
    mobile: {
      breakpoint: { max: 570, min: 0 },
      items: 1,
      partialVisibilityGutter: -10
    }
  };

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      // showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={false}
      autoPlaySpeed={1000}
      showDots={screens.xxl ? false : true}
      partialVisible={screens.xl ? false : true}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      arrows={false}
      renderArrowsWhenDisabled={false}>
      {children}
    </Carousel>
  );
}
