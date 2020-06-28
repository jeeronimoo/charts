import React, { PureComponent } from "react";
import { BarNameValueChart } from "./bar-name-value";
import { getBarNameValueData } from "./bar-name-value/data";

export class D3Charts extends PureComponent {
  state = {
    barNameValue: getBarNameValueData(),
  };

  componentDidMount() {
    this.intervalRef = setInterval(this.changeData, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalRef);
  }

  changeData = () => {
    this.setState({
      barNameValue: getBarNameValueData(),
    });
  };

  render() {
    return (
      <div style={{ padding: 10 }}>
        <BarNameValueChart
          width={300}
          height={300}
          data={this.state.barNameValue}
        />
      </div>
    );
  }
}
