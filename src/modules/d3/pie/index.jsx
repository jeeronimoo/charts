import React, { createRef, PureComponent } from "react";
import * as d3 from "d3";

export class PieChart extends PureComponent {
  svgRef = createRef();

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    // this.renderChart();
  }

  getMainCalculations = () => {
    const { width, height } = this.props;

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    return {
      plotWidth,
      plotHeight,
    };
  };

  renderChart = () => {
    const { data } = this.props;
    const { plotWidth, plotHeight } = this.getMainCalculations();

    if (this.plot) {
      // this.plot.selectAll(`#tooltip`).remove();
    } else {
      this.plot = d3
        .select(this.svgRef.current)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    }

    const color = d3.scaleOrdinal([
      "#4daf4a",
      "#377eb8",
      "#ff7f00",
      "#984ea3",
      "#e41a1c",
    ]);

    const radius = d3.min([plotWidth, plotHeight]) / 2;
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const arcs = d3.pie().value((d) => d.value)(data);

    this.plot
      .append("g")
      .attr("transform", `translate(${radius}, ${radius})`)
      .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc)
      .append("title")
      .text((d) => `${d.data.name}: ${d.data.value}`);
  };

  render() {
    const { width, height } = this.props;

    return (
      <div style={{ width, height, border: "1px solid black" }}>
        <svg ref={this.svgRef} width={width} height={height} />
      </div>
    );
  }
}

const margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30,
};
