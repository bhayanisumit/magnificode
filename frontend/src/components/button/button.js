import React from "react";

const Button = ({ classname, label, onClick }) => {
  return (
    <button
      className={classname}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;