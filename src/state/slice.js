import { createSlice } from "@reduxjs/toolkit";
import data from "../data/shapes.json";
import shuffle from "../lib/shuffle";

const initalCells = [];
for (let row = 1; row <= 7; row++) {
  for (let col = 1; col <= 7; col++) {
    initalCells.push({ column: col, row: row, color: "#c9c9c9" });
  }
}

const randomizeShapes = shuffle(data);

const initialState = {
  cells: initalCells,
  currentCell: null,
  shapes: randomizeShapes,
  selectedShape: null,
};

const highlightCells = (state, action) => {
  let color = "green";
  var cell = action.payload;
  state.currentCell = cell;
  if (state.selectedShape !== null) {
    const translatedCells = state.selectedShape.map((shape) => {
      return {
        column: shape.x + cell.column,
        row: shape.y + cell.row,
      };
    });
    if (
      translatedCells.some(
        (x) => x.column < 1 || x.column > 7 || x.row < 1 || x.row > 7
      )
    ) {
      color = "red";
    }
    const cellsToHightlight = state.cells.filter((cell) => {
      return translatedCells.some((shape) => {
        return cell.column === shape.column && cell.row === shape.row;
      });
    });
    cellsToHightlight.forEach((cell) => {
      cell.color = color;
    });
  }
};

const resetGrid = (state) => {
  state.cells.forEach((cell) => {
    cell.color = "#c9c9c9";
  });
};

const resetCurrentCell = (state) => {
  state.currentCell = null;
};

const selectShape = (state, action) => {
  var selectedShapeId = action.payload;
  state.selectedShape = data.filter((x) => x.id === selectedShapeId)[0].cells;
};

const rotate = (state) => {
  state.selectedShape = state.selectedShape.map((cell) => ({
    x: cell.y,
    y: -cell.x,
  }));
  if (state.currentCell !== null) {
    resetGrid(state);
    highlightCells(state, { payload: state.currentCell });
  }
};

const flip = (state) => {
  state.selectedShape = state.selectedShape.map((cell) => ({
    x: cell.x,
    y: -cell.y,
  }));
  if (state.currentCell !== null) {
    resetGrid(state);
    highlightCells(state, { payload: state.currentCell });
  }
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    rotate,
    flip,
    resetGrid,
    highlightCells,
    resetCurrentCell,
    selectShape,
  },
});

export const shapeChoices = (state) => state.game.shapes.slice(0, 3);
export const selectCell = (state, column, row) =>
  state.game.cells.filter((x) => x.column === column && x.row === row)[0];

const actions = { ...gameSlice.actions };
export { actions };

export default gameSlice.reducer;
