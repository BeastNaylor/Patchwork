import { createSlice } from "@reduxjs/toolkit";
import data from "../data/shapes.json";
import shuffle from "../lib/shuffle";
import colors from "../data/colors";

const initalCells = [];
for (let row = 1; row <= 7; row++) {
  for (let col = 1; col <= 7; col++) {
    initalCells.push({ column: col, row: row, color: colors.default });
  }
}

const noShapeSelected = {
  id: null,
  cells: [],
  status: "none",
};

const randomizeShapes = shuffle(data);

const initialState = {
  cells: initalCells,
  currentCell: null,
  shapes: randomizeShapes,
  selectedShape: noShapeSelected,
};

const highlightCells = (state, action) => {
  let color = colors.valid;
  var cell = action.payload;
  state.currentCell = cell;
  if (state.selectedShape.status === "up") {
    const translatedCells = state.selectedShape.cells.map((shape) => {
      return {
        column: shape.x + cell.column,
        row: shape.y + cell.row,
      };
    });
    //check if shape out of bounds
    if (
      translatedCells.some(
        (x) => x.column < 1 || x.column > 7 || x.row < 1 || x.row > 7
      )
    ) {
      color = colors.invalid;
      state.selectedShape.status = "invalid";
    }
    const cellsToHightlight = state.cells.filter((cell) => {
      return translatedCells.some((shape) => {
        return cell.column === shape.column && cell.row === shape.row;
      });
    });
    if (
      cellsToHightlight.filter((cell) => cell.color !== colors.default).length >
      0
    ) {
      color = colors.invalid;
      state.selectedShape.status = "invalid";
    }
    cellsToHightlight
      .filter((cell) => cell.color !== colors.filled)
      .forEach((cell) => {
        cell.color = color;
      });
  }
};

const resetHighlightedCells = (state) => {
  if (state.selectedShape.status !== "down") {
    state.cells
      .filter(
        (cell) => cell.color === colors.valid || cell.color === colors.invalid
      )
      .forEach((cell) => {
        cell.color = colors.default;
      });
    state.selectedShape.status = "up";
  }
};

const resetGrid = (state) => {
  state.cells
    .filter((cell) => cell.color !== colors.filled)
    .forEach((cell) => {
      cell.color = colors.default;
    });
};

const resetCurrentCell = (state) => {
  state.currentCell = null;
};

const selectShape = (state, action) => {
  state.selectedShape.id = action.payload;
  state.selectedShape.cells = data.filter(
    (x) => x.id === action.payload
  )[0].cells;
  state.selectedShape.status = "up";
  resetGrid(state);
};

const passTurn = (state) => {
  state.selectedShape = noShapeSelected;
  resetGrid(state);
};

const rotate = (state) => {
  state.selectedShape.cells = state.selectedShape.cells.map((cell) => ({
    x: cell.y,
    y: -cell.x,
  }));
  if (state.currentCell !== null) {
    resetGrid(state);
    highlightCells(state, { payload: state.currentCell });
  }
};

const flip = (state) => {
  state.selectedShape.cells = state.selectedShape.cells.map((cell) => ({
    x: cell.x,
    y: -cell.y,
  }));
  if (state.currentCell !== null) {
    resetGrid(state);
    highlightCells(state, { payload: state.currentCell });
  }
};

const confirmTurn = (state) => {
  state.cells
    .filter((cell) => cell.color === colors.selected)
    .forEach((cell) => (cell.color = colors.filled));
  state.selectedShape = noShapeSelected;
};

const confirmPlacement = (state) => {
  if (state.selectedShape.status === "up") {
    const validCells = state.cells.filter((cell) => {
      return cell.color === colors.valid;
    });
    validCells.forEach((cell) => (cell.color = colors.selected));
    state.selectedShape.status = "down";
  }
};

const resetTurn = (state) => {
  resetGrid(state);
  state.selectedShape = noShapeSelected;
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    rotate,
    flip,
    resetGrid,
    resetHighlightedCells,
    highlightCells,
    resetCurrentCell,
    selectShape,
    passTurn,
    confirmTurn,
    confirmPlacement,
    resetTurn,
  },
});

export const selectedShape = (state) => state.game.selectedShape.id;
export const shapeChoices = (state) => state.game.shapes.slice(0, 3);
export const selectCell = (state, column, row) =>
  state.game.cells.filter((x) => x.column === column && x.row === row)[0];

const actions = { ...gameSlice.actions };
export { actions };

export default gameSlice.reducer;
