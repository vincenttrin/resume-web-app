import { EAST, NORTH, WEST, SOUTH, internals } from './gridGameSlice.js';

describe('the solveGridGame function', () => {
  test('solves a length-1 1-pawn puzzle on a 2×1 grid', () => {
    const initialGrid = [
      '□●',
    ].join('\n');
    const goalGrid = [
      '●□',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      WEST,
    ]);
  });
  test('solves a length-1 1-pawn puzzle on a 2×2 grid', () => {
    const initialGrid = [
      '□●',
      '□□',
    ].join('\n');
    const goalGrid = [
      '□□',
      '□●',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      SOUTH,
    ]);
  });
  test('solves a length-1 2-pawn puzzle on a 2×2 grid', () => {
    const initialGrid = [
      '●●',
      '□□',
    ].join('\n');
    const goalGrid = [
      '□□',
      '●●',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      SOUTH,
    ]);
  });
  test('solves a length-2 2-pawn puzzle on a 3×3 grid', () => {
    const initialGrid = [
      '□□●',
      '□□□',
      '●□□',
    ].join('\n');
    const goalGrid = [
      '□□●',
      '□□□',
      '□□●',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      EAST, EAST,
    ]);
  });
  test('solves a length-4 2-pawn puzzle on a 3×3 grid', () => {
    const initialGrid = [
      '●□□',
      '□□■',
      '□●■',
    ].join('\n');
    const goalGrid = [
      '□□□',
      '□●■',
      '●□■',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      EAST, EAST, WEST, SOUTH,
    ]);
  });
  test('solves a length-6 2-pawn puzzle on a 3×3 grid', () => {
    const initialGrid = [
      '□□●',
      '■□□',
      '●□□',
    ].join('\n');
    const goalGrid = [
      '□●□',
      '■□□',
      '□□●',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      EAST, NORTH, WEST, WEST, SOUTH, EAST,
    ]);
  });
  test('solves a length-3 4-pawn puzzle on a 3×3 grid', () => {
    const initialGrid = [
      '□●●',
      '●●□',
      '□□□',
    ].join('\n');
    const goalGrid = [
      '□●□',
      '●●●',
      '□□□',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      SOUTH, SOUTH, NORTH,
    ]);
  });
  test('solves another length-3 4-pawn puzzle on a 3×3 grid', () => {
    const initialGrid = [
      '□□●',
      '●□●',
      '□□●',
    ].join('\n');
    const goalGrid = [
      '□●□',
      '□●●',
      '□●□',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      WEST, WEST, EAST,
    ]);
  });
  test('solves a length-8 4-pawn puzzle on a 3×3 grid', () => {
    const initialGrid = [
      '□●●',
      '□●●',
      '■□□',
    ].join('\n');
    const goalGrid = [
      '□●●',
      '□●□',
      '■●□',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      WEST, SOUTH, EAST, EAST, SOUTH, WEST, NORTH, NORTH,
    ]);
  });
  test('solves a length-10 3-pawn puzzle on a 4×4 grid', () => {
    const initialGrid = [
      '●□●□',
      '□□□■',
      '□●■□',
      '□□□□',
    ].join('\n');
    const goalGrid = [
      '□□●□',
      '□□□■',
      '□□■□',
      '□□●●',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      EAST, SOUTH, SOUTH, EAST, SOUTH, WEST, WEST, WEST, EAST, EAST,
    ]);
  });
  test('solves a length-12 3-pawn puzzle on a 4×4 grid', () => {
    const initialGrid = [
      '□●□□',
      '□●□■',
      '●□■□',
      '□□□■',
    ].join('\n');
    const goalGrid = [
      '□□□□',
      '●□●■',
      '□□■□',
      '●□□■',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      SOUTH, EAST, EAST, SOUTH, NORTH, EAST, NORTH, WEST, NORTH, EAST, WEST, SOUTH,
    ]);
  });
  test('solves a length-13 6-pawn puzzle on a 4×4 grid', () => {
    const initialGrid = [
      '□□□□',
      '●□●□',
      '□●■■',
      '●■●●',
    ].join('\n');
    const goalGrid = [
      '□□●□',
      '●□●●',
      '□□■■',
      '□■●●',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      NORTH, EAST, EAST, WEST, SOUTH, WEST, WEST, EAST, EAST, NORTH, NORTH, NORTH, SOUTH,
    ]);
  });
  test('solves a length-14 6-pawn puzzle on a 4×4 grid', () => {
    const initialGrid = [
      '□●□□',
      '●■■□',
      '●●●□',
      '●□□□',
    ].join('\n');
    const goalGrid = [
      '□□●●',
      '□■■●',
      '□●□□',
      '□●□●',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      NORTH, EAST, NORTH, WEST, NORTH, EAST, SOUTH, SOUTH, EAST, NORTH, WEST, NORTH, SOUTH, EAST,
    ]);
  });
  test('solves a length-17 5-pawn puzzle on a 5×5 grid', () => {
    const initialGrid = [
      '■●□□□',
      '□□■□□',
      '●□□□□',
      '■□□●■',
      '●□□■●',
    ].join('\n');
    const goalGrid = [
      '■□□●●',
      '□□■●□',
      '□□□□□',
      '■□□□■',
      '●□□■●',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      NORTH, NORTH, EAST, NORTH, EAST, SOUTH, EAST, EAST, WEST, WEST, SOUTH, SOUTH, NORTH, EAST, SOUTH, WEST,
      NORTH,
    ]);
  });
  test('solves a length-22 5-pawn puzzle on a 5×5 grid', () => {
    const initialGrid = [
      '□●□□■',
      '□●■□□',
      '□□□□□',
      '●□□●■',
      '■□□●□',
    ].join('\n');
    const goalGrid = [
      '□□□□■',
      '●□■●□',
      '□□□●●',
      '●□□□■',
      '■□□□□',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      NORTH, EAST, EAST, NORTH, NORTH, WEST, SOUTH, SOUTH, NORTH, EAST, SOUTH, WEST, NORTH, WEST, NORTH, SOUTH,
      EAST, NORTH, SOUTH, WEST, NORTH, SOUTH,
    ]);
  });
  test('solves a length-31 6-pawn puzzle on a 6×5 grid', () => {
    const initialGrid = [
      '●■□□□□',
      '□□□●□□',
      '□□●■□●',
      '□□■□□□',
      '●□■●■■',
    ].join('\n');
    const goalGrid = [
      '●■□□●□',
      '□□□●□□',
      '●□□■●●',
      '□□■□□□',
      '□□■□■■',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      NORTH, NORTH, NORTH, SOUTH, EAST, EAST, SOUTH, EAST, EAST, WEST, SOUTH, WEST, WEST, WEST, NORTH, WEST,
      SOUTH, NORTH, EAST, SOUTH, EAST, WEST, NORTH, EAST, SOUTH, NORTH, WEST, EAST, SOUTH, NORTH, WEST,
    ]);
  });
  test('solves a length-34 6-pawn puzzle on a 6×5 grid', () => {
    const initialGrid = [
      '□●●□□□',
      '■□●□□□',
      '●□●□□■',
      '□□□□■■',
      '□■■□●□',
    ].join('\n');
    const goalGrid = [
      '●●□□□□',
      '■□●□□□',
      '□□●□□■',
      '●●□□■■',
      '□■■□□□',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      WEST, SOUTH, WEST, NORTH, SOUTH, EAST, EAST, EAST, EAST, EAST, SOUTH, EAST, SOUTH, WEST, WEST, WEST,
      WEST, WEST, NORTH, WEST, SOUTH, EAST, NORTH, EAST, WEST, SOUTH, NORTH, WEST, SOUTH, NORTH, EAST, EAST,
      WEST, WEST,
    ]);
  });
  test('solves a length-46 7-pawn puzzle on a 6×6 grid', () => {
    const initialGrid = [
      '□□■■●□',
      '●□□■□●',
      '□□□□●□',
      '□■■●□□',
      '□□●□□□',
      '■□□●■□',
    ].join('\n');
    const goalGrid = [
      '□□■■□□',
      '□□□■●□',
      '□□□●●□',
      '□■■□□□',
      '□●●□□□',
      '■□●□■●',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      EAST, EAST, EAST, SOUTH, EAST, SOUTH, SOUTH, WEST, WEST, WEST, NORTH, SOUTH, EAST, EAST, EAST, WEST,
      NORTH, WEST, WEST, SOUTH, NORTH, EAST, EAST, SOUTH, WEST, NORTH, WEST, WEST, EAST, EAST, SOUTH, EAST,
      EAST, NORTH, WEST, WEST, SOUTH, NORTH, EAST, EAST, SOUTH, WEST, WEST, EAST, EAST, WEST,
    ]);
  });
  test('solves a length-55 7-pawn puzzle on a 6×6 grid', () => {
    const initialGrid = [
      '□●□□□□',
      '□□□●□□',
      '□□●□■●',
      '□□□●■□',
      '□□□●■□',
      '■□■□□●',
    ].join('\n');
    const goalGrid = [
      '□□●●●□',
      '□□●●□□',
      '□□□□■□',
      '●□□□■□',
      '□□●□■□',
      '■□■□□□',
    ].join('\n');
    const solution = internals.solveGridGame(initialGrid, goalGrid);
    expect(solution).toBeDefined();
    expect(solution).toEqual([
      NORTH, NORTH, EAST, SOUTH, EAST, SOUTH, NORTH, EAST, SOUTH, WEST, WEST, SOUTH, EAST, EAST, NORTH, NORTH,
      EAST, SOUTH, WEST, SOUTH, EAST, NORTH, NORTH, WEST, SOUTH, EAST, SOUTH, WEST, NORTH, WEST, WEST, EAST,
      SOUTH, WEST, NORTH, EAST, EAST, EAST, EAST, WEST, SOUTH, WEST, WEST, WEST, EAST, EAST, EAST, SOUTH,
      WEST, EAST, NORTH, WEST, NORTH, EAST, WEST,
    ]);
  });
});
