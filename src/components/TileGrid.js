import React from "react";
import { Row } from "reactstrap";
import TileSquare from "./TileSquare";

const TileGrid = () => {
  let grid = [];
  for (let row = 1; row <= 7; row++) {
    let rows = [];
    for (let col = 1; col <= 7; col++) {
      rows.push(<TileSquare key={col + "-" + row} column={col} row={row} />);
    }
    grid.push(
      <Row
        key={row}
        style={{ flexFlow: "row nowrap", justifyContent: "center" }}
      >
        {rows}
      </Row>
    );
  }

  return <Row>{grid}</Row>;
};

export default TileGrid;
