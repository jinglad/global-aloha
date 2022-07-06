import React from "react";
import AppHeader from "../Reused/AppHeader/AppHeader";

const LayoutComp = ({ children }: any) => {
  return (
    <div>
      <AppHeader />
      <div>{children}</div>
    </div>
  );
};

export default LayoutComp;
