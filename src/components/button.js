import React from "react";
import classNames from "classnames";

const Button = ({
  type = "button",
  variant = "default",
  className = "",
  children,
  onClick,
}) => {
  const baseClasses = "px-4 py-1 rounded-md font-bold transition-colors";

  const variantClasses = {
    default:
      "bg-sugar-cane-500 hover:bg-sugar-cane-600 active:bg-sugar-cane-700 hover:text-sugar-cane-50 active:text-sugar-cane-50",
    outline:
      "border-solid border-2 border-sugar-cane-700 bg-sugar-cane-50 text-sugar-cane-950 hover:bg-sugar-cane-200 active:bg-sugar-cane-300",
    red: "bg-wisp-pink-500 hover:bg-wisp-pink-600 active:bg-wisp-pink-700 text-wisp-pink-50 ",
    red_outline:
      "border-solid border-2 border-wisp-pink-700 bg-wisp-pink-50 text-wisp-pink-950 hover:bg-wisp-pink-200 active:bg-wisp-pink-300",
    blue: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white hover:text-blue-50 active:text-blue-50",
    // 필요에 따라 더 많은 변형을 추가할 수 있습니다.
  };

  const buttonClasses = classNames(
    baseClasses,
    variantClasses[variant],
    className
  );

  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
