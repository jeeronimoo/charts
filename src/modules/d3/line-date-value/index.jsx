import React, { createRef, PureComponent } from "react";
import * as d3 from "d3";
import { format } from "date-fns";

export class LineDateValueChart extends PureComponent {
  svgRef = createRef();

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    // this.renderChart();
  }

  getMainCalculations = () => {
    const { width, height, data } = this.props;

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const yMinValue = d3.min(data.map((el) => el.value)) || 0;

    const yMaxDomain = d3.max(data.map((el) => el.value)) || 0;
    const yMinDomain = yMinValue > 0 ? 0 : yMinValue;

    const dateNow = Date.now();

    const xMaxDomain = d3.max(data.map((el) => el.date)) || dateNow;
    const xMinDomain = d3.min(data.map((el) => el.date)) || dateNow;

    return {
      plotWidth,
      plotHeight,
      yMaxDomain,
      yMinDomain,
      xMaxDomain,
      xMinDomain,
    };
  };

  getScales = () => {
    const { data } = this.props;
    const {
      plotWidth,
      plotHeight,
      yMaxDomain,
      yMinDomain,
      xMaxDomain,
      xMinDomain,
    } = this.getMainCalculations();

    const yScale = d3
      .scaleLinear()
      .domain([yMinDomain, yMaxDomain])
      .rangeRound([plotHeight, 0]);

    const xScale = d3
      .scaleTime()
      .domain([xMinDomain, xMaxDomain])
      .rangeRound([0, plotWidth]);

    return {
      xScale,
      yScale,
    };
  };

  renderChart = () => {
    const { data } = this.props;
    // const { plotHeight } = this.getMainCalculations();
    const { xScale, yScale } = this.getScales();

    // Side effects
    if (this.plot) {
      // this.plot.selectAll(`#tooltip`).remove();
      //
      // this.updateAxes();
    } else {
      this.plot = d3
        .select(this.svgRef.current)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      this.renderAxes();
    }

    // Line
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // prettier-ignore
    this.plot
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "none")
      .attr("opacity", "0.6")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2);

    // Dots
    this.plot
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("opacity", "0.6")
      .attr("fill", "steelblue")
      .attr("cx", (d, i) => xScale(d.date))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 5);
  };

  renderAxes = () => {
    const { data } = this.props;
    const { plotHeight } = this.getMainCalculations();
    const { xScale, yScale } = this.getScales();

    // X Axis
    const xTicks = d3
      .axisBottom(xScale)
      .tickFormat((i) => format(i, "dd.MM.yy"))
      .ticks(data.length);

    this.plot
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate(0,${plotHeight})`)
      .call(xTicks);

    // Y Axis
    this.plot.append("g").attr("class", "yAxis").call(d3.axisLeft(yScale));
  };

  updateAxes = () => {};

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
