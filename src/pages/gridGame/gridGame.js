/* IMPORTANT: Remove this directive when you start working on the code so that
 * the linter will warn you about code style issues. */
/* eslint-disable no-unused-vars */
import goalImage from './images/goal.jpg';
import wallImage from './images/wall.jpg';
import pawnImage from './images/pawn.jpg';

import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './gridGame.module.css';
import confetti from 'canvas-confetti';

import {
  goToEarlierLevel,
  goToLaterLevel,
  move,
  undo,
  requestHint,
  selectCurrent,
  selectGoal,
  selectLevelIndex,
  WALL,
  PAWN,
  NORTH,
  WEST,
  SOUTH,
  EAST,
  selectSolved,
  selectShowingHint,
  selectHint,
} from './gridGameSlice.js';
import { useSyncExternalStore } from 'react';

function Cell(props) {
  let cellType = <></>;

  if (props.isGoal) {
    cellType = <img src={goalImage} alt="Goal" style={{ maxWidth: '100%',
      maxHeight: '100%' }} />;
  }

  if (props.isPawn) {
    cellType = <img src={pawnImage} alt="Pawn" style={{ maxWidth: '100%',
      maxHeight: '100%' }} />;
  }

  if (props.isWall) {
    cellType = <img src={wallImage} alt="Wall" style={{ maxWidth: '100%',
      maxHeight: '100%' }} />;
  }

  return (
    <div style={{
      gridColumn: props.column + 1,
      gridRow: props.row + 1,
      border: '1px solid black',
      fontSize: '100',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>{cellType}</div>
  );
}

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  isWall: PropTypes.bool.isRequired,
  isPawn: PropTypes.bool.isRequired,
  isGoal: PropTypes.bool.isRequired,
};

export default function GridGame() {
  // Finish this React component per the assignment instructions.
  const current = useSelector(selectCurrent);
  const goal = useSelector(selectGoal);
  const level = useSelector(selectLevelIndex);
  const showHint = useSelector(selectShowingHint);
  const generatedHint = useSelector(selectHint);
  const dispatch = useDispatch();
  const solved = useSelector(selectSolved);
  let message = '';
  if (solved){
    message = 'Complete!';
    confetti({
      angle: 360,
      spread: 360,
      // eslint-disable-next-line no-magic-numbers
      particleCount: 300,
    });
  }
  if (showHint) {
    let hintDirection = undefined;
    switch (generatedHint) {
    case NORTH:
      hintDirection = 'North';
      break;
    case SOUTH:
      hintDirection = 'South';
      break;
    case EAST:
      hintDirection = 'East';
      break;
    case WEST:
      hintDirection = 'West';
      break;
    default:
      break;
    }
    message = `Go ${hintDirection}`;
  }
  const nextLevel = () => dispatch(goToLaterLevel({
    level: level + 1,
  }));
  const prevLevel = () => dispatch(goToEarlierLevel({
    level: level - 1,
  }));
  const undoMove = () => dispatch(undo());
  const hint = () => dispatch(requestHint());

  const moveUp = () => dispatch(move({
    direction: NORTH,
  }));
  const moveLeft = () => dispatch(move({
    direction: WEST,
  }));
  const moveRight = () => dispatch(move({
    direction: EAST,
  }));
  const moveDown = () => dispatch(move({
    direction: SOUTH,
  }));

  const content = [];
  for (const [row, column] of current.getLocations()) {
    const currentCellType = current.get([row, column]);
    const goalCellType = goal.get([row, column]);
    content.push(
      <Cell
        key={`${row},${column}`}
        row={row}
        column={column}
        isWall={currentCellType === WALL}
        isPawn={currentCellType === PAWN}
        isGoal={goalCellType === PAWN} />,
    );
  }

  return (
    <body>
      <div>
        <text>Level {level + 1}</text>
      </div>
      <div className={styles.utility}>
        <button onClick={prevLevel}>Previous level</button>
        <button onClick={nextLevel}>Next level</button>
      </div>
      <div className={styles.grid} style={{
        gridTemplateColumns: `repeat(${current.width}, 1fr)`,
        gridTemplateRows: `repeat(${current.height}, 1fr)`,
      }}>{content}</div>
      <div>
        <div>
          <button className={styles.square} onClick={moveUp}>Up</button>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.square} onClick={moveLeft}>Left</button>
          <button className={styles.square} onClick={moveRight}>Right</button>
        </div>
        <div>
          <button className={styles.square} onClick={moveDown}>Down</button>
        </div>
      </div>
      <div className={styles.utility}>
        <button onClick={undoMove}>Undo</button>
        <button onClick={hint}>Hint</button>
      </div>
      <text id="message">{message}</text>

    </body>
  );
}
