import React, { PureComponent } from "react";
import { BarNameValueChart } from "./bar-name-value";
import { getBarNameValueData } from "./bar-name-value/data";
import { Button, ButtonGroup } from "react-bootstrap";
import { LineDateValueChart } from "./line-date-value";
import { lineDateValueData } from "./line-date-value/data";
import { pieData } from "./pie/data";
import { PieChart } from "./pie";

export class D3Charts extends PureComponent {
  state = {
    updateTime: 0,
    barNameValue: getBarNameValueData(),
    lineDateValue: lineDateValueData,
  };

  componentDidMount() {
    this.changeUpdateTime(this.state.updateTime)();
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  clearInterval = () => {
    window.clearInterval(this.intervalRef);
  };

  setInterval = (updateTime) => {
    this.intervalRef = setInterval(this.changeData, updateTime);
  };

  changeData = () => {
    this.setState({
      barNameValue: getBarNameValueData(),
    });
  };

  changeUpdateTime = (updateTime) => () => {
    this.clearInterval();
    this.setState({ updateTime });

    if (updateTime !== 0) {
      this.setInterval(updateTime);
    }
  };

  isActive = (time) => {
    return this.state.updateTime === time;
  };

  renderSwitcher = () => (
    <ButtonGroup aria-label="Basic example">
      <Button
        variant="info"
        onClick={this.changeUpdateTime(0)}
        active={this.isActive(0)}
      >
        None
      </Button>
      <Button
        variant="info"
        onClick={this.changeUpdateTime(2000)}
        active={this.isActive(2000)}
      >
        2s
      </Button>
      <Button
        variant="info"
        onClick={this.changeUpdateTime(5000)}
        active={this.isActive(5000)}
      >
        5s
      </Button>
      <Button
        variant="info"
        onClick={this.changeUpdateTime(10000)}
        active={this.isActive(10000)}
      >
        10s
      </Button>
    </ButtonGroup>
  );

  render() {
    return (
      <div style={{ padding: 10 }}>
        {/*<div style={{ margin: 10, display: "flex", alignItems: "baseline" }}>*/}
        {/*  <p style={{ marginRight: 10 }}>Update every:</p>*/}
        {/*  {this.renderSwitcher()}*/}
        {/*</div>*/}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <BarNameValueChart
            width={300}
            height={300}
            data={this.state.barNameValue}
          />
          <LineDateValueChart
            width={300}
            height={300}
            data={this.state.lineDateValue}
          />
          <PieChart data={pieData} width={300} height={300} />
        </div>
      </div>
    );
  }
}
