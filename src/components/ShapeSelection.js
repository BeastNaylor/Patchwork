import React from "react";
import { Row } from "reactstrap";

const ShapeSelection = ({ shapeId, onClick }) => {
  return (
    <div
      onClick={(x) => onClick(shapeId)}
      style={{ width: "100px", height: "100px", backgroundColor: "blue" }}
    ></div>
  );
};

export default ShapeSelection;
