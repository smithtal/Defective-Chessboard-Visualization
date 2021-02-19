import React from "react";
import ChessBoardContainer from "./ChessBoardContainer";

function Container() {
  const [inputSize, setInputSize] = React.useState(2);
  const [runSimulation, setRunSimulation] = React.useState(false);

  return (
    <div>
      <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
        Defective Chess Board
      </h1>
      {!runSimulation && (
        <div
          style={{
            margin: "10px auto",
            display: "flex",
            justifyContent: "space-between",
            width: "20%",
          }}
        >
          <button
            disabled={inputSize === 2}
            onClick={() => {
              setInputSize((inputSize) => inputSize / 2);
            }}
          >
            -
          </button>
          <div>Number of Rows: {inputSize}</div>
          <button
            onClick={() => {
              setInputSize((inputSize) => inputSize * 2);
            }}
          >
            +
          </button>
        </div>
      )}

      <ChessBoardContainer n={inputSize} />
    </div>
  );
}

export default Container;
