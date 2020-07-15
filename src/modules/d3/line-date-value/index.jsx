import React, { PureComponent } from "react";
import * as d3 from "d3";

export class LineDateValueChart extends PureComponent {
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  getMainCalculations = () => {
    const { width, height, data } = this.props;

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const yMinValue = d3.min(data.map((el) => el.value)) || 0;

    const yMaxDomain = d3.max(data.map((el) => el.value)) || 0;
    const yMinDomain = yMinValue > 0 ? 0 : yMinValue;

    // const xMaxDomain = d3.max(data.map(el => el))
    // const xMinDomain = 0

    return {
      plotWidth,
      plotHeight,
      yMaxDomain,
      yMinDomain,
      // xMaxDomain,
      // xMinDomain,
    };
  };

  // getScales = () => {
  //   const { data } = this.props;
  //   const {
  //     plotWidth,
  //     plotHeight,
  //     yMaxDomain,
  //     yMinDomain,
  //   } = this.getMainCalculations();
  //
  //   const yScale = d3
  //     .scaleLinear()
  //     .domain([yMinDomain, yMaxDomain])
  //     .rangeRound([plotHeight, 0]);
  //
  //   const xScale = d3
  //     .scaleLinear()
  //     .domain([])
  //     .rangeRound([0, plotWidth])
  //     .padding(0.4);
  //
  //   return {
  //     xScale,
  //     yScale,
  //   };
  // };

  // renderChart = () => {
  //   const { width, height, data } = this.props;
  //   const {
  //     plotWidth,
  //     plotHeight,
  //     yMaxDomain,
  //     yMinDomain,
  //   } = this.getMainCalculations();
  //
  //   this.plot = d3
  //     .select(this.svgRef.current)
  //     .append("g")
  //     .attr("transform", `translate (${margin.left}, ${margin.top})`);
  //
  //   // X Axis
  //   this.plot.append("g")
  //     .attr("class", "xAxis")
  //     .attr("transform", `translate(0, ${plotHeight})`)
  //     .call()
  // };

  updateChart = () => {};

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
  top: 5,
  right: 5,
  bottom: 5,
  left: 5,
};
