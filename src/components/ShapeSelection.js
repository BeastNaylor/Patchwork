import React from "react";
import { Row } from "reactstrap";

const ShapeSelection = ({ shapeId, onClick }) => {
  return (
    <div
      onClick={(x) => onClick(shapeId)}
      style={{
        width: "100px",
        height: "100px",
        border: "1px solid black",
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      Shape {shapeId}
    </div>
  );
};

export default ShapeSelection;
