"use client";
import {Grid} from "antd";
import {ReactNode} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function HomeCarousel({children}: {children: ReactNode}) {
  const screens = Grid.useBreakpoint();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: {max: 4000, min: 3000},
      items: 4,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: {max: 3000, min: 1300},
      items: 4,
      partialVisibilityGutter: 40,
    },

    md: {
      breakpoint: {max: 1400, min: 1200},
      items: 3,
      partialVisibilityGutter: 10,
    },

    tablet: {
      breakpoint: {max: 1200, min: 680},
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: {max: 680, min: 400},
      items: 1,
      partialVisibilityGutter: 20,
    },
    xs: {
      breakpoint: {max: 400, min: 0},
      items: 1,
      partialVisibilityGutter: 0,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      arrows={false}
      infinite={false}
      containerClass="plans-carousel"
      itemClass="plans-carousel-item"
      showDots={screens.xxl ? false : true}
      partialVisible={screens.xl ? false : true}
    >
      {children}
    </Carousel>
  );
}
