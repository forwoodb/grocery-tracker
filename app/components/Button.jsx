"use client";
import React from "react";

const Button = ({ children, click, className = "", border = false }) => {
  return (
    <>
      <button
        onClick={click}
        className={`
          inline-flex 
          justify-center 
          align-middle 
          px-2.5 
          mx-1
          cursor-pointer 
          rounded
          ${border ? "border border-black" : ""}
          ${className}
          `}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
