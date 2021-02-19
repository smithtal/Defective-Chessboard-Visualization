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
        <div style={{ margin: "0 auto", display: "flex" }}>
          <button
            disabled={inputSize === 2}
            onClick={() => {
              setInputSize((inputSize) => inputSize / 2);
            }}
          >
            -
          </button>
          <div>{inputSize}</div>
          <button
            onClick={() => {
              setInputSize((inputSize) => inputSize * 2);
            }}
          >
            +
          </button>
          <button onClick={() => setRunSimulation(true)}>
            Start Simulation
          </button>
        </div>
      )}

      <ChessBoardContainer n={inputSize} />
    </div>
  );
}

export default Container;
