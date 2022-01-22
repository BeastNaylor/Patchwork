import { createSlice } from "@reduxjs/toolkit";

const initalCells = [];
for (let row = 1; row <= 7; row++) {
  for (let col = 1; col <= 7; col++) {
    initalCells.push({ column: col, row: row, color: "#c9c9c9" });
  }
}

const initialState = {
  value: 0,
  status: "idle",
  cells: initalCells,
  currentCell: null,
  selectedShape: [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
};

const highlightCells = (state, action) => {
  let color = "green";
  var cell = action.payload;
  state.currentCell = cell;
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
};

const resetGrid = (state) => {
  state.cells.forEach((cell) => {
    cell.color = "#c9c9c9";
  });
};

const resetCurrentCell = (state) => {
  state.currentCell = null;
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
  },
});

export const selectCount = (state) => state.game.value;
export const selectCell = (state, column, row) =>
  state.game.cells.filter((x) => x.column === column && x.row === row)[0];

const actions = { ...gameSlice.actions };
export { actions };

export default gameSlice.reducer;
