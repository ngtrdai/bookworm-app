import React from "react";

function ButtonCustom({ children, ...props }) {
  return (
    <button {...props}>{children}</button>
  );
}