import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCell, actions } from "../state/slice";

const TileSquare = ({ column, row }) => {
  const cell = useSelector((state) => selectCell(state, column, row));
  const dispatch = useDispatch();
  const color = cell.color;

  return (
    <div
      style={{
        backgroundColor: color,
        border: "black solid 1px",
        width: "75px",
        height: "75px",
      }}
      onMouseOver={(x) => dispatch(actions.highlightCells(cell))}
      onMouseOut={(x) => {
        dispatch(actions.resetHighlightedCells());
        dispatch(actions.resetCurrentCell());
      }}
      onClick={(x) => dispatch(actions.confirmPlacement())}
    ></div>
  );
};

export default TileSquare;
