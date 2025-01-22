"use client";
import {useState, useEffect} from "react";
import {CSSProperties} from "react";
import {ArrowUp} from "@phosphor-icons/react";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonStyle: CSSProperties = {
    position: "fixed",
    bottom: "150px",
    right: 20,
    borderRadius: "30px",
    backgroundColor: "#206fba",
    color: "white",
    width: "50px",
    height: "50px",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 1000,
    opacity: 0.7,
    transition: "all 0.35s ease",
    textAlign: "center",
    alignContent: "center",
    display: isVisible ? "block" : "none",
  };

  return (
    <div style={buttonStyle as CSSProperties} onClick={scrollToTop}>
      <ArrowUp style={{fontSize: "24px"}} />
    </div>
  );
};

export default ScrollToTopButton;
