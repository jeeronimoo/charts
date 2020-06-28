import React, { createRef, PureComponent } from "react";
import * as d3 from "d3";

export class BarNameValueChart extends PureComponent {
  svgRef = createRef();

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate = () => {
    this.removeChart();
    this.renderChart();
  };

  removeChart = () => {
    d3.select(this.svgRef.current).select("g").remove();
  };

  renderChart = () => {
    const { data, width, height } = this.props;

    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const yMaxDomain = d3.max(data.map((el) => el.value)) || 0;
    const dataMinValue = d3.min(data.map((el) => el.value)) || 0;
    const yMinDomain = dataMinValue > 0 ? 0 : dataMinValue;

    const svg = d3
      .select(this.svgRef.current)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const yScale = d3
      .scaleLinear()
      .domain([yMinDomain, yMaxDomain])
      .rangeRound([plotHeight, 0]);

    const xScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([0, plotWidth])
      .padding(0.4);

    // const color = d3
    //   .scaleLinear()
    //   .domain([yMinDomain, yMaxDomain])
    //   .range(["steelblue", "#378b8c"]);

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${plotHeight})`)
      .call(d3.axisBottom(xScale).tickFormat((i) => data[i].name))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-10px")
      .attr("dy", "-1px")
      .attr("transform", "rotate(-45)");

    // Y Axis
    // prettier-ignore
    svg
      .append('g')
      .call(d3.axisLeft(yScale))

    const bars = svg.selectAll("rect").data(data);

    bars.exit().remove();

    // Bars
    bars
      .enter()
      .append("rect")
      // .transition()
      // .duration(500)
      // .ease(d3.easeElasticIn)
      // .merge(bars)
      .attr("fill", "steelblue")
      // .attr("fill", (d) => color(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => plotHeight - yScale(d.value))
      .attr("x", (d, i) => xScale(i))
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
