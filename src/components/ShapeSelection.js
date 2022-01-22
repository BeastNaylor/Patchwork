import React from "react";

const ShapeSelection = ({ shapeId, onClick, selected }) => {
  return (
    <div
      onClick={(x) => onClick(shapeId)}
      style={{
        width: "100px",
        height: "100px",
        border: "1px solid black",
        cursor: "pointer",
        textAlign: "center",
        backgroundColor: selected ? "green" : "",
      }}
    >
      Shape {shapeId}
    </div>
  );
};

export default ShapeSelection;
