import React from "react";

const svgId = "graph-svg";
const componentId = "some-element";
const leftEdgeLineId = "some-element-left-edge-resize-line";

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
    const edge = document.getElementById(leftEdgeLineId);
    const svg = document.getElementById(svgId);
    edge.addEventListener("mouseover", this.hoverOverLeftEdge);
    edge.addEventListener("mouseout", this.hoverOutLeftEdge);
    svg.addEventListener("mousedown", this.mouseDown);
    svg.addEventListener("mouseup", this.mouseUp);
    svg.addEventListener("mousemove", this.mouseMove);
  }

  componentWillUnmount() {
    const edge = document.getElementById(leftEdgeLineId);
    const svg = document.getElementById(svgId);
    edge.removeEventListener("mouseover", this.hoverOverLeftEdge);
    edge.removeEventListener("mouseout", this.hoverOutLeftEdge);
    svg.removeEventListener("mousedown", this.mouseDown);
    svg.removeEventListener("mouseup", this.mouseUp);
    svg.removeEventListener("mousemove", this.mouseMove);
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
      const svg = document.getElementById(svgId);
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
          id={leftEdgeLineId}
          name={leftEdgeLineId}
          d={`M${this.state.x},${-this.props.canvasHeight + this.state.y} v${this.state.height}`}
          style={pathStyle}
        />
      </g>
    );
  }
}

export default ResizeableRect;
