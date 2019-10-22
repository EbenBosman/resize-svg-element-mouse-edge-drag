import React from "react";

const componentId = "some-element";
const leftEdgeLine = "some-element-left-edge-resize-line";

class ResizeableRect extends React.Component {
  state = {
    showLeftEdge: false,
    mouseDown: false,
    height: 1000,
    width: 1000,
    x: 50,
    y: 50
  };

  componentDidMount() {
    const element = document.getElementById(leftEdgeLine);
    element.addEventListener("mouseover", this.hoverOverLeftEdge);
    element.addEventListener("mouseout", this.hoverOutLeftEdge);
    element.addEventListener("mousedown", this.mouseDown);
    element.addEventListener("mouseup", this.mouseUp);
    element.addEventListener("mousemove", this.mouseMove);
  }

  componentWillUnmount() {
    const element = document.getElementById(leftEdgeLine);
    element.removeEventListener("mouseover", this.hoverOverLeftEdge);
    element.removeEventListener("mouseout", this.hoverOutLeftEdge);
    element.removeEventListener("mousedown", this.mouseDown);
    element.removeEventListener("mouseup", this.mouseUp);
    element.removeEventListener("mousemove", this.mouseMove);
  }

  hoverOverLeftEdge = e => {
    e.preventDefault();
    this.setState({ ...this.state, showLeftEdge: true });
  };

  hoverOutLeftEdge = e => {
    e.preventDefault();
    this.setState({ ...this.state, showLeftEdge: false });
  };

  mouseDown = e => {
    e.preventDefault();
    this.setState({ ...this.state, mouseDown: true });
  };

  mouseUp = e => {
    e.preventDefault();
    this.setState({ ...this.state, showLeftEdge: false, mouseDown: false });
  };

  mouseMove = e => {
    e.preventDefault();
    /*
        https://stackoverflow.com/a/13088899/813689
        1 = Left   mouse button
        2 = Center mouse button
        3 = Right  mouse button
        */
    if (this.state && this.state.mouseDown && e.which === 1) {
      const svg = document.getElementById("graph-svg");
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;

      const newCoordinates = pt.matrixTransform(svg.getScreenCTM().inverse());
      const newWidth = this.state.x + this.state.width - newCoordinates.x;

      if (newWidth > 0)
        this.setState({ ...this.state, x: newCoordinates.x, width: newWidth });
      else this.setState({ ...this.state, x: newCoordinates.x, width: 0 });
    } else {
      this.setState({ ...this.state, mouseDown: false });
    }
  };

  render() {
    const style = {
      fill: "#9ee7ff"
    };

    const pathStyle = {
      cursor: this.state.showLeftEdge ? "col-resize" : "",
      stroke: this.state.showLeftEdge ? "#036485" : "transparent",
      strokeWidth: 3
    };

    return (
      <g>
        <rect
          id={componentId}
          name={componentId}
          x={this.state.x}
          y={-this.props.canvasHeight + this.state.y}
          width={this.state.width}
          height={this.state.height}
          style={style}
        />
        <path
          id={leftEdgeLine}
          name={leftEdgeLine}
          d={`M${this.state.x},${-this.props.canvasHeight + this.state.y} v${this.state.height}`}
          style={pathStyle}
        />
      </g>
    );
  }
}

export default ResizeableRect;
