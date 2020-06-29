import React, { createRef, PureComponent } from "react";
import * as d3 from "d3";
import "./style.css";

export class BarNameValueChart extends PureComponent {
  svgRef = createRef();

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate = () => {
    this.updateChart();
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

  renderChart = () => {
    const { data } = this.props;
    const { plotHeight } = this.getMainCalculations();
    const { xScale, yScale } = this.getScales();

    this.plot = d3
      .select(this.svgRef.current)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // const color = d3
    //   .scaleLinear()
    //   .domain([yMinDomain, yMaxDomain])
    //   .range(["steelblue", "#378b8c"]);

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

    // Bars
    const bars = this.plot.selectAll("rect").data(data);

    bars
      .enter()
      .append("rect")
      // FIXME: 'enter()' doesnt work properly
      // .join("rect")
      // .merge(bars)
      .attr("fill", "steelblue")
      .attr("opacity", "0.6")
      // .attr("fill", (d) => color(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => plotHeight - yScale(d.value))
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d.value))
      .on("mouseover", this.handleMouseOver)
      .on("mouseout", this.handleMouseOut);
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
      // .attr("id", `${d.name}-${d.value}`)
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

  updateChart = () => {
    const { data } = this.props;
    const {
      plotWidth,
      plotHeight,
      yMaxDomain,
      yMinDomain,
    } = this.getMainCalculations();

    this.plot.selectAll(`#tooltip`).remove();

    const yScale = d3
      .scaleLinear()
      .domain([yMinDomain, yMaxDomain])
      .rangeRound([plotHeight, 0]);

    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([0, plotWidth])
      .padding(0.4);

    // X Axis
    this.plot
      .select(".xAxis")
      .transition()
      .duration(500)
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
        .select('.yAxis')
        .transition()
        .duration(500)
        .call(d3.axisLeft(yScale));

    const bars = this.plot.selectAll("rect").data(data);

    bars.exit().remove();

    bars
      .transition()
      .duration(1000)
      .attr("opacity", "0.6")
      .attr("height", (d) => plotHeight - yScale(d.value))
      .attr("y", (d) => yScale(d.value));
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
