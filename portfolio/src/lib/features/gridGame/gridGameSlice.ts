import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { LEVELS } from './levels';
import { bfs, Direction } from './graphSearch';

export const FLOOR = '□';
export const WALL = '■';
export const PAWN = '●';

export const EAST: Direction = [0, 1];
export const NORTH: Direction = [-1, 0];
export const WEST: Direction = [0, -1];
export const SOUTH: Direction = [1, 0];
const DIRECTIONS: Direction[] = [EAST, NORTH, WEST, SOUTH];

function shift([row, column]: [number, number], [deltaRow, deltaColumn]: Direction): [number, number] {
  return [row + deltaRow, column + deltaColumn];
}

export class Vertex {
  cells: string[][];

  constructor(input: string, removePawns = false) {
    this.cells = input.split('\n').map((row) =>
      [...row].map((cell) =>
        removePawns ? (cell === WALL ? WALL : FLOOR) : cell
      )
    );
  }

  get height(): number {
    return this.cells.length;
  }

  get width(): number {
    return Math.max(...this.cells.map((rowCells) => rowCells.length));
  }

  *getLocations(): Generator<[number, number]> {
    for (let row = 0; row < this.cells.length; ++row) {
      const rowCells = this.cells[row];
      for (let column = 0; column < rowCells.length; ++column) {
        yield [row, column];
      }
    }
  }

  *getLocationsOf(cellType: string): Generator<[number, number]> {
    for (let row = 0; row < this.cells.length; ++row) {
      const rowCells = this.cells[row];
      for (let column = 0; column < rowCells.length; ++column) {
        if (rowCells[column] === cellType) {
          yield [row, column];
        }
      }
    }
  }

  *getInverseLocationsOf(cellType: string): Generator<[number, number]> {
    for (let row = this.cells.length - 1; row >= 0; --row) {
      const rowCells = this.cells[row];
      for (let column = rowCells.length - 1; column >= 0; --column) {
        if (rowCells[column] === cellType) {
          yield [row, column];
        }
      }
    }
  }

  get([row, column]: [number, number]): string {
    if (row >= 0 && row < this.cells.length) {
      const rowCells = this.cells[row];
      if (column >= 0 && column < rowCells.length) {
        return rowCells[column];
      }
    }
    return WALL;
  }

  set([row, column]: [number, number], cellType: string): void {
    this.cells[row][column] = cellType;
  }

  getChild(direction: Direction): Vertex {
    const vertex = new Vertex(`${this}`);
    const checkOrder =
      direction === SOUTH || direction === EAST
        ? this.getInverseLocationsOf(PAWN)
        : this.getLocationsOf(PAWN);

    for (const pawnCell of checkOrder) {
      const checkCell = shift(pawnCell, direction);
      if (vertex.get(checkCell) === FLOOR) {
        vertex.set(checkCell, PAWN);
        vertex.set(pawnCell, FLOOR);
      }
    }
    return vertex;
  }

  get incidences(): { action: Direction; child: Vertex }[] {
    return DIRECTIONS.map((direction) => ({
      action: direction,
      child: this.getChild(direction),
    }));
  }

  toString(): string {
    return this.cells.map((row) => row.join('')).join('\n');
  }
}

function solveGridGame(initialString: string, goalString: string): Direction[] | undefined {
  const edges = bfs(new Vertex(initialString), (vertex) => `${vertex}` === goalString);
  return edges !== undefined ? edges.map((edge) => edge.action!).filter(Boolean) : undefined;
}

interface LevelState {
  stack: string[];
  goal: string;
  hints: Direction[] | undefined;
}

interface GridGameState {
  levels: LevelState[];
  selectedLevel: number;
  showingHint: boolean;
}

function getCurrentLevel(gridGame: GridGameState): LevelState {
  return gridGame.levels[gridGame.selectedLevel];
}

function getCurrentGrid(level: LevelState): string {
  return level.stack[level.stack.length - 1];
}

function getCurrentHint(level: LevelState): Direction | undefined {
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
  } as GridGameState,
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
    move: (gridGame, action: PayloadAction<{ direction: Direction }>) => {
      const { direction } = action.payload;
      const level = getCurrentLevel(gridGame);
      const current = getCurrentGrid(level);
      if (current !== level.goal) {
        level.stack.push(`${new Vertex(current).getChild(direction)}`);
        const hint = getCurrentHint(level);
        if (hint !== undefined && direction[0] === hint[0] && direction[1] === hint[1]) {
          level.hints!.shift();
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
    resetLevel: (gridGame) => {
      const level = getCurrentLevel(gridGame);
      level.stack = [LEVELS[gridGame.selectedLevel].initialState];
      level.hints = undefined;
      gridGame.showingHint = false;
    },
  },
});

export default gridGameSlice;

export const { goToEarlierLevel, goToLaterLevel, move, undo, requestHint, resetLevel } =
  gridGameSlice.actions;

export function selectLevelIndex(state: { gridGame: GridGameState }): number {
  return state.gridGame.selectedLevel;
}

export function selectCanGoToEarlierLevel(state: { gridGame: GridGameState }): boolean {
  return state.gridGame.selectedLevel - 1 >= 0;
}

export function selectCanGoToLaterLevel(state: { gridGame: GridGameState }): boolean {
  return state.gridGame.selectedLevel + 1 < state.gridGame.levels.length;
}

export function selectCanUndo(state: { gridGame: GridGameState }): boolean {
  return getCurrentLevel(state.gridGame).stack.length > 1;
}

export const selectCurrent = createSelector(
  [(state: { gridGame: GridGameState }) => getCurrentGrid(getCurrentLevel(state.gridGame))],
  (gridString) => new Vertex(gridString)
);

export const selectGoal = createSelector(
  [(state: { gridGame: GridGameState }) => getCurrentLevel(state.gridGame).goal],
  (gridString) => new Vertex(gridString)
);

export function selectSolved(state: { gridGame: GridGameState }): boolean {
  const level = getCurrentLevel(state.gridGame);
  return getCurrentGrid(level) === level.goal;
}

export function selectShowingHint(state: { gridGame: GridGameState }): boolean {
  return state.gridGame.showingHint;
}

export function selectHint(state: { gridGame: GridGameState }): Direction | undefined {
  return getCurrentHint(getCurrentLevel(state.gridGame));
}
