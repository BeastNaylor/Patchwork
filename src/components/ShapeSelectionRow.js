import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "reactstrap";
import ShapeSelection from "./ShapeSelection";
import { actions, shapeChoices, selectedShape } from "../state/slice";

const ShapeSelectionRow = () => {
  const dispatch = useDispatch();
  const shapes = useSelector(shapeChoices);
  const selectedShapeId = useSelector(selectedShape);

  const handleSelectShape = (shape) => {
    dispatch(actions.selectShape(shape));
  };

  return (
    <Row
      className={"mt-2"}
      style={{ justifyContent: "center", flexFlow: "row nowrap" }}
    >
      {shapes.map((x) => {
        return (
          <div key={x.id} style={{ width: "initial" }}>
            <ShapeSelection
              onClick={handleSelectShape}
              shapeId={x.id}
              selected={x.id === selectedShapeId}
            />
          </div>
        );
      })}
      <div style={{ width: "initial" }}>
        <div
          onClick={(x) => dispatch(actions.passTurn())}
          style={{
            width: "100px",
            height: "100px",
            border: "1px solid black",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          Pass
        </div>
      </div>
    </Row>
  );
};

export default ShapeSelectionRow;
