import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const TitleBar = () => {
  return (
    <div>
      <Navbar color="primary" dark>
        <NavbarBrand>Patchwork</NavbarBrand>
      </Navbar>
    </div>
  );
};

export default TitleBar;
