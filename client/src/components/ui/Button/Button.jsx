import React from "react";

const Button = ({
  as: Component = "button",
  children,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <Component
      type={Component === "button" ? type : undefined}
      onClick={onClick}
      className={`
        px-5
        py-3
        rounded-xl
        bg-red-500
        hover:bg-red-600
        transition-all
        duration-300
        font-medium
        shadow-lg
        hover:scale-105
        active:scale-95
        inline-flex
        items-center
        justify-center
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;