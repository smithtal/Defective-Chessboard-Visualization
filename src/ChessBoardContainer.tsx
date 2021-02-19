import React from "react";
import range from "lodash.range";
import random from "lodash.random";
import randomColor from "randomcolor";

import ChessBoard, { IChessBoardSquare } from "./ChessBoard";

interface IChessBoardContainerProps {
  n: number;
}

function ChessBoardContainer(props: IChessBoardContainerProps) {
  const [squares, setSquares] = React.useState<IChessBoardSquare[][]>([]);

  const reset = () => {
    const columns = range(props.n);
    const squares = columns.map(() => {
      return columns.map(() => {
        return { color: "white" };
      });
    }) as IChessBoardSquare[][];

    const missingTile = {
      row: random(props.n - 1),
      column: random(props.n - 1),
    };

    squares[missingTile.row][missingTile.column] = { color: "black" };
    setSquares(squares);

    fillChessBoard({
      squares,
      rowStart: 0,
      rowEnd: squares.length - 1,
      columnStart: 0,
      columnEnd: squares.length - 1,
      missingTile: missingTile!,
    });
  };
  React.useEffect(reset, [props.n]);

  const fillChessBoard = ({
    squares,
    rowStart,
    rowEnd,
    columnStart,
    columnEnd,
    missingTile,
  }: fillChessBoardArguments) => {
    let color = randomColor({ luminosity: "random", hue: "random" });
    if (rowEnd - rowStart === 1) {
      range(rowStart, rowEnd + 1).forEach((row) => {
        range(columnStart, columnEnd + 1).forEach((column) => {
          if (squares[row][column].color === "white") {
            squares[row][column].color = color;
          }
        });
      });
    } else {
      const rows = range(rowStart, rowEnd + 1);
      const columns = range(columnStart, columnEnd + 1);

      const leftRowEnd = rows[Math.floor(rows.length / 2) - 1];
      const rightRowStart = leftRowEnd + 1;

      const upperColumnEnd = columns[Math.floor(columns.length / 2) - 1];
      const lowerColumnStart = upperColumnEnd + 1;

      const quadrant1 = {
        rowStart,
        rowEnd: leftRowEnd,
        columnStart,
        columnEnd: upperColumnEnd,
      };

      const quadrant2 = {
        rowStart: rightRowStart,
        rowEnd,
        columnStart,
        columnEnd: upperColumnEnd,
      };

      const quadrant3 = {
        rowStart,
        rowEnd: leftRowEnd,
        columnStart: lowerColumnStart,
        columnEnd,
      };

      const quadrant4 = {
        rowStart: rightRowStart,
        rowEnd,
        columnStart: lowerColumnStart,
        columnEnd,
      };

      const quadrantMissingTile = findQuadrantWithMissingTile(
        [quadrant1, quadrant2, quadrant3, quadrant4],
        missingTile
      );

      if (quadrantMissingTile >= 0) {
        let missingTile1 = null;
        let missingTile2 = null;
        let missingTile3 = null;
        let missingTile4 = null;

        missingTile1 = { row: upperColumnEnd, column: leftRowEnd };
        missingTile2 = { row: upperColumnEnd, column: rightRowStart };
        missingTile3 = { row: lowerColumnStart, column: leftRowEnd };
        missingTile4 = { row: lowerColumnStart, column: rightRowStart };

        const squareTopLeft = squares[missingTile1.row][missingTile1.column];
        const squareTopRight = squares[missingTile2.row][missingTile2.column];
        const squareBottomLeft = squares[missingTile3.row][missingTile3.column];

        const squareBottomRight =
          squares[missingTile4.row][missingTile4.column];

        if (quadrantMissingTile === 0) {
          squareTopRight.color = color;
          squareBottomLeft.color = color;
          squareBottomRight.color = color;
          missingTile1 = missingTile;
        }

        if (quadrantMissingTile === 1) {
          squareTopLeft.color = color;
          squareBottomLeft.color = color;
          squareBottomRight.color = color;
          missingTile2 = missingTile;
        }

        if (quadrantMissingTile === 2) {
          squareTopLeft.color = color;
          squares[missingTile2.row][missingTile2.column].color = color;
          squares[missingTile4.row][missingTile4.column].color = color;
          missingTile3 = missingTile;
        }

        if (quadrantMissingTile === 3) {
          squares[missingTile1.row][missingTile1.column].color = color;
          squares[missingTile2.row][missingTile2.column].color = color;
          squares[missingTile3.row][missingTile3.column].color = color;
          missingTile4 = missingTile;
        }

        setSquares(squares);
        fillChessBoard({
          squares,
          rowStart: quadrant1.rowStart,
          rowEnd: quadrant1.rowEnd,
          columnStart: quadrant1.columnStart,
          columnEnd: quadrant1.columnEnd,
          missingTile: missingTile1!,
        });

        fillChessBoard({
          squares,
          rowStart: quadrant2.rowStart,
          rowEnd: quadrant2.rowEnd,
          columnStart: quadrant2.columnStart,
          columnEnd: quadrant2.columnEnd,
          missingTile: missingTile2!,
        });

        fillChessBoard({
          squares,
          rowStart: quadrant3.rowStart,
          rowEnd: quadrant3.rowEnd,
          columnStart: quadrant3.columnStart,
          columnEnd: quadrant3.columnEnd,
          missingTile: missingTile3!,
        });

        fillChessBoard({
          squares,
          rowStart: quadrant4.rowStart,
          rowEnd: quadrant4.rowEnd,
          columnStart: quadrant4.columnStart,
          columnEnd: quadrant4.columnEnd,
          missingTile: missingTile4!,
        });
      }
    }
  };

  return <ChessBoard squares={squares} />;
}

function findQuadrantWithMissingTile(
  quadrants: quadrant[],
  missingTile: { row: number; column: number }
) {
  const index = quadrants.findIndex((quadrant) => {
    return (
      missingTile.row >= quadrant.columnStart &&
      missingTile.row <= quadrant.columnEnd &&
      missingTile.column >= quadrant.rowStart &&
      missingTile.column <= quadrant.rowEnd
    );
  });

  if (index === -1) {
    debugger;
  }

  return index;
}

type fillChessBoardArguments = {
  squares: IChessBoardSquare[][];
  rowStart: number;
  rowEnd: number;
  columnStart: number;
  columnEnd: number;
  missingTile: { row: number; column: number };
};

type quadrant = {
  rowStart: number;
  rowEnd: number;
  columnStart: number;
  columnEnd: number;
};

export default ChessBoardContainer;
