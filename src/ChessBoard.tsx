import React from "react";

export interface IChessBoardSquare {
  color: string;
  special?: boolean;
}

export interface IChessBoardProps {
  squares: IChessBoardSquare[][];
}

function ChessBoard(props: IChessBoardProps) {
  const squareWidth = props.squares.length && 100 / props.squares[0].length;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        height: "800px",
        width: "800px",
        margin: "0 auto",
      }}
    >
      {props.squares.map((row, rowIndex) => {
        return (
          <React.Fragment>
            {row.map((square, columnIndex) => {
              return (
                <Square
                  key={`${rowIndex}|${columnIndex}`}
                  width={squareWidth}
                  color={square.color}
                  special={square.special || false}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
}

interface ISquareProps {
  width: number;
  color: string;
  special: boolean;
}

function Square(props: ISquareProps) {
  return (
    <div
      style={{
        width: `${props.width}%`,
        backgroundColor: props.color,
        border: `1px solid ${props.special ? "red" : "black"}`,
        boxSizing: "border-box",
      }}
    />
  );
}

export default ChessBoard;
