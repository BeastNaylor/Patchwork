import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "reactstrap";
import ShapeSelection from "./ShapeSelection";
import { actions, shapeChoices } from "../state/slice";

const ShapeSelectionRow = () => {
  const dispatch = useDispatch();
  const shapes = useSelector(shapeChoices);

  const handleSelectShape = (shape) => {
    dispatch(actions.selectShape(shape));
  };

  return (
    <Row className={"mt-2"} style={{ justifyContent: "center" }}>
      {shapes.map((x) => {
        return (
          <div
            key={x.id}
            style={{ width: "100px", height: "100px", backgroundColor: "blue" }}
          >
            <ShapeSelection onClick={handleSelectShape} shapeId={x.id} />
          </div>
        );
      })}
    </Row>
  );
};

export default ShapeSelectionRow;
