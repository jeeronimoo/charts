import React, { createRef, PureComponent } from "react";
import * as d3 from "d3";
import "./style.css";

export class BarNameValueChart extends PureComponent {
  svgRef = createRef();

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate = () => {
    this.renderChart();
  };

  getMainCalculations = () => {
    const { data, width, height } = this.props;

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const yMaxDomain = d3.max(data.map((el) => el.value)) || 0;
    const dataMinValue = d3.min(data.map((el) => el.value)) || 0;
    const yMinDomain = dataMinValue > 0 ? 0 : dataMinValue;

    return {
      plotWidth,
      plotHeight,
      yMaxDomain,
      yMinDomain,
    };
  };

  getScales = () => {
    const { data } = this.props;
    const {
      plotWidth,
      plotHeight,
      yMaxDomain,
      yMinDomain,
    } = this.getMainCalculations();

    const yScale = d3
      .scaleLinear()
      .domain([yMinDomain, yMaxDomain])
      .rangeRound([plotHeight, 0]);

    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([0, plotWidth])
      .padding(0.4);

    return {
      xScale,
      yScale,
    };
  };

  renderAxes = () => {
    const { data } = this.props;
    const { plotHeight } = this.getMainCalculations();
    const { xScale, yScale } = this.getScales();

    // X Axis
    this.plot
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate(0,${plotHeight})`)
      .call(d3.axisBottom(xScale).tickFormat((i) => data[i].name))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-10px")
      .attr("dy", "-1px")
      .attr("transform", "rotate(-45)");

    // Y Axis
    // prettier-ignore
    this.plot
      .append('g')
      .attr('class', 'yAxis')
      .call(d3.axisLeft(yScale));
  };

  updateAxes = () => {
    const { data } = this.props;
    const { xScale, yScale } = this.getScales();

    // X Axis
    this.plot
      .select(".xAxis")
      .transition()
      .duration(500)
      .call(d3.axisBottom(xScale).tickFormat((i) => data[i].name));

    // Y Axis
    // prettier-ignore
    this.plot
      .select('.yAxis')
      .transition()
      .duration(500)
      .call(d3.axisLeft(yScale));
  };

  renderChart = () => {
    const { data } = this.props;
    const { plotHeight } = this.getMainCalculations();
    const { xScale, yScale } = this.getScales();

    // Side effects
    if (this.plot) {
      this.plot.selectAll(`#tooltip`).remove();

      this.updateAxes();
    } else {
      this.plot = d3
        .select(this.svgRef.current)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      this.renderAxes();
    }

    // Bars
    const bars = this.plot.selectAll("rect").data(data);

    bars
      .join("rect")
      .on("mouseover", this.handleMouseOver)
      .on("mouseout", this.handleMouseOut)
      .transition()
      .duration(1000)
      .attr("fill", "steelblue")
      .attr("opacity", "0.6")
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => plotHeight - yScale(d.value))
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d.value));
  };

  handleMouseOver = (d, i, group) => {
    const { data } = this.props;
    const { xScale, yScale } = this.getScales();

    this.plot
      .selectAll("rect")
      .data(data)
      .attr("opacity", (d, idx) => (idx === i ? "1" : "0.6"));

    const xOffset = d.value > 99 ? 3 : 0;

    this.plot
      .append("text")
      .attr("id", "tooltip")
      .attr("x", xScale(i) - xOffset)
      .attr("y", yScale(d.value) - 5)
      .text(d.value);

    this.plot.select(`#${d.name}-${d.value}`);
  };

  handleMouseOut = (d, i, group) => {
    const { data } = this.props;

    this.plot.selectAll("rect").data(data).attr("opacity", "0.6");

    this.plot.selectAll(`#tooltip`).remove();
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
  bottom: 50,
  left: 30,
};
