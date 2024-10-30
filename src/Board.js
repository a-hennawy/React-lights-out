import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 4, ncols = 4, chanceLightStartsOn = 0.7 }) {
  const [board, setBoard] = useState(createBoard());

  function randomBool() {
    let randomNum = Math.random();
    return randomNum < chanceLightStartsOn ? true : false;
  }
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from({ length: nrows }, () =>
      Array.from({ length: ncols }, () => randomBool())
    );

    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    const win = board.flat().every((cell) => cell === true);
    return win;
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number); //the Number is shorthand for (str => Number(str))
      // if this coord is actually on board, flip it (if true becomes false, and vice versa)
      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard (by using map!!)
      const newBoardState = oldBoard.map((row) => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      const cellsToFlip = [
        { y, x },
        { y, x: x + 1 },
        { y, x: x - 1 },
        { y: y + 1, x },
        { y: y - 1, x },
      ];

      cellsToFlip.forEach((c) => flipCell(c.y, c.x, newBoardState));

      // TODO: return the copy
      return newBoardState;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return <div>You Win!</div>;
  }

  // make table board

  return (
    <div className="board">
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((isLit, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  flipCellsAroundMe={() =>
                    flipCellsAround(`${rowIndex}-${colIndex}`)
                  }
                  isLit={isLit}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
