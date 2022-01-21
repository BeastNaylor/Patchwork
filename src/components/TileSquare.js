import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCell, actions } from "../state/slice";

const TileSquare = ({ column, row, Active }) => {
  const cell = useSelector((state) => selectCell(state, column, row));
  const dispatch = useDispatch();
  const color = cell.color;

  return (
    <div
      style={{ height: "100px", width: "100px", backgroundColor: color }}
      onMouseOver={(x) => dispatch(actions.highlightCells(cell))}
      onMouseOut={(x) => {
        dispatch(actions.resetGrid());
        dispatch(actions.resetCurrentCell());
      }}
    >
      Column {column}, Row {row}
    </div>
  );
};

export default TileSquare;
