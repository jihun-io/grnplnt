import React from "react";

const Button = ({
  type = "button",
  className = "px-4 py-1 bg-sugar-cane-500 hover:bg-sugar-cane-600 active:bg-sugar-cane-700 transition-colors hover:text-sugar-cane-50 active:text-sugar-cane-50 rounded-md ml-auto font-bold",
  children,
  onClick,
}) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
