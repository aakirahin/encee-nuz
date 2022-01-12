import React from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <a id="scroll-to-top" onClick={scrollToTop}>
      <BsArrowUpSquareFill size={52} />
    </a>
  );
}
