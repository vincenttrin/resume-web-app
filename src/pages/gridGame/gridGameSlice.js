/* IMPORTANT: Remove this directive when you start working on the code so that
 * the linter will warn you about code style issues. */

import { createSlice, createSelector } from '@reduxjs/toolkit';

import { LEVELS } from './levels.js';

import { bfs } from './graphSearch.js';

export const FLOOR = '□';
export const WALL = '■';
export const PAWN = '●';

export const EAST = [0, 1];
export const NORTH = [-1, 0];
export const WEST = [0, -1];
export const SOUTH = [1, 0];
const DIRECTIONS = [EAST, NORTH, WEST, SOUTH];

function shift([row, column], [deltaRow, deltaColumn]) {
  return [row + deltaRow, column + deltaColumn];
}

class Vertex {
  constructor(string, removePawns = false) {
    this.cells = string.split('\n').map((row) =>
      [...row].map((cell) =>
        removePawns ?
          cell === WALL ? WALL : FLOOR :
          cell,
      ),
    );
  }

  get height() {
    return this.cells.length;
  }

  get width() {
    return Math.max(...this.cells.map((rowCells) => rowCells.length));
  }

  *getLocations() {
    for (let row = 0; row < this.cells.length; ++row) {
      const rowCells = this.cells[row];
      for (let column = 0; column < rowCells.length; ++column) {
        yield [row, column];
      }
    }
  }

  *getLocationsOf(cellType) {
    for (let row = 0; row < this.cells.length; ++row) {
      const rowCells = this.cells[row];
      for (let column = 0; column < rowCells.length; ++column) {
        if (rowCells[column] === cellType) {
          yield [row, column];
        }
      }
    }
  }

  *getInverseLocationsOf(cellType) {
    for (let row = this.cells.length - 1; row >= 0; --row) {
      const rowCells = this.cells[row];
      for (let column = rowCells.length - 1; column >= 0; --column) {
        if (rowCells[column] === cellType) {
          yield [row, column];
        }
      }
    }
  }

  get([row, column]) {
    if (row >= 0 && row < this.cells.length) {
      const rowCells = this.cells[row];
      if (column >= 0 && column < rowCells.length) {
        return rowCells[column];
      }
    }
    return WALL;
  }

  set([row, column], cellType) {
    this.cells[row][column] = cellType;
  }

  getChild(direction) {
    const vertex = new Vertex(`${this}`);
    let checkOrder = this.getLocationsOf(PAWN);
    if (direction === SOUTH || direction === EAST){
      checkOrder = this.getInverseLocationsOf(PAWN);
    } else {
      checkOrder = this.getLocationsOf(PAWN);
    }
    for (const pawnCell of checkOrder){
      const checkCell = shift(pawnCell, direction);
      if (vertex.get(checkCell) === FLOOR){
        vertex.set(checkCell, PAWN);
        vertex.set(pawnCell, FLOOR);
      }
    }
    return vertex;
  }

  get incidences() {
    // Implement this function per the assignment instructions.
    const results = [];
    for (const direction of DIRECTIONS){
      if (direction === WEST){
        results.push(
          {
            action: WEST,
            child: this.getChild(WEST),
          },
        );
      }
      if (direction === EAST){
        results.push(
          {
            action: EAST,
            child: this.getChild(EAST),
          },
        );
      }
      if (direction === SOUTH){
        results.push(
          {
            action: SOUTH,
            child: this.getChild(SOUTH),
          },
        );
      }
      if (direction === NORTH){
        results.push(
          {
            action: NORTH,
            child: this.getChild(NORTH),
          },
        );
      }
    }
    return results;
  }

  toString() {
    return this.cells.map((row) => row.join('')).join('\n');
  }
}

function solveGridGame(initialString, goalString) {
  const edges = bfs(new Vertex(initialString), (vertex) => `${vertex}` === goalString);
  return edges !== undefined ? [...edges.map((edge) => edge.action)] : undefined;
}

function getCurrentLevel(gridGame) {
  return gridGame.levels[gridGame.selectedLevel];
}

function getCurrentGrid(level) {
  return level.stack[level.stack.length - 1];
}

function getCurrentHint(level) {
  return level.hints !== undefined && level.hints.length > 0 ? level.hints[0] : undefined;
}

const gridGameSlice = createSlice({
  name: 'gridGame',
  initialState: {
    levels: LEVELS.map(({ initialState, goal }) => ({
      stack: [initialState],
      goal,
      hints: undefined,
    })),
    selectedLevel: 0,
    showingHint: false,
  },
  reducers: {
    goToEarlierLevel: (gridGame) => {
      const newSelectedLevel = gridGame.selectedLevel - 1;
      if (newSelectedLevel >= 0) {
        gridGame.selectedLevel = newSelectedLevel;
        gridGame.showingHint = false;
      }
    },
    goToLaterLevel: (gridGame) => {
      const newSelectedLevel = gridGame.selectedLevel + 1;
      if (newSelectedLevel < gridGame.levels.length) {
        gridGame.selectedLevel = newSelectedLevel;
        gridGame.showingHint = false;
      }
    },
    move: (gridGame, action) => {
      const {
        direction,
      } = action.payload;
      const level = getCurrentLevel(gridGame);
      const current = getCurrentGrid(level);
      if (current !== level.goal) {
        level.stack.push(`${new Vertex(current).getChild(direction)}`);
        const hint = getCurrentHint(level);
        if (hint !== undefined && direction[0] === hint[0] && direction[1] === hint[1]) {
          level.hints.shift();
        } else {
          level.hints = undefined;
        }
        gridGame.showingHint = false;
      }
    },
    undo: (gridGame) => {
      const level = getCurrentLevel(gridGame);
      if (level.stack.length > 1) {
        level.stack.pop();
        level.hints = undefined;
        gridGame.showingHint = false;
      }
    },
    requestHint: (gridGame) => {
      const level = getCurrentLevel(gridGame);
      if (!gridGame.showingHint) {
        if (level.hints === undefined) {
          level.hints = solveGridGame(getCurrentGrid(level), level.goal);
        }
        gridGame.showingHint = true;
      }
    },
  },
});
export default gridGameSlice;

export const {
  goToEarlierLevel,
  goToLaterLevel,
  move,
  undo,
  requestHint,
} = gridGameSlice.actions;

export function selectLevelIndex(state) {
  return state.gridGame.selectedLevel;
}

export function selectCanGoToEarlierLevel(state) {
  return state.gridGame.selectedLevel - 1 >= 0;
}

export function selectCanGoToLaterLevel(state) {
  return state.gridGame.selectedLevel + 1 < state.gridGame.levels.length;
}

export function selectCanUndo(state) {
  return getCurrentLevel(state.gridGame).stack.length > 1;
}

export const selectCurrent = createSelector(
  [
    (state) => getCurrentGrid(getCurrentLevel(state.gridGame)),
  ],
  (string) => new Vertex(string),
);

export const selectGoal = createSelector(
  [
    (state) => getCurrentLevel(state.gridGame).goal,
  ],
  (string) => new Vertex(string),
);

export function selectSolved(state) {
  const level = getCurrentLevel(state.gridGame);
  return getCurrentGrid(level) === level.goal;
}

export function selectShowingHint(state) {
  return state.gridGame.showingHint;
}

export function selectHint(state) {
  return getCurrentHint(getCurrentLevel(state.gridGame));
}

export const internals = {
  solveGridGame,
};
