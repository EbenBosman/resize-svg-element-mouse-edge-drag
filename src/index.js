import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import ResizeableRect from "./components/ResizeableRect";

const rootElement = document.getElementById("root");

const canvasHeight = 4000;
const canvasWidth = 4000;

const viewBox = [1, -1 * canvasHeight, canvasWidth, canvasHeight];

const jsx = (
  <div className="page-container">
    <div className="graph-container-wrapper">
      <div className="graph-container">
        <div
          style={{
            height: "100%",
            position: "relative",
            backgroundColor: "#ddd"
          }}
        >
          <div
            className="canvas-scrollbar"
            style={{
              height: "100%",
              overflow: "auto",
              backgroundColor: "#ddd"
            }}
          >
            <div
              className="canvas-scrollbar"
              style={{
                height: "100%",
                overflow: "auto"
              }}
            >
              <svg
                id="graph-svg"
                width={canvasWidth}
                height={canvasHeight}
                preserveAspectRatio="xMinYMin meet"
                viewBox={viewBox}
                style={{ backgroundColor: "white" }}
              >
                <ResizeableRect canvasHeight={canvasHeight} />
                <text
                  x="50"
                  y={-canvasHeight + 25}
                  fill="black"
                  fontSize="20px"
                >
                  Hold mouse over the left edge, click and hold to drag/change
                  the blue square's size
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ReactDOM.render(jsx, rootElement);
