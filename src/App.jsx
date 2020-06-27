import React, { PureComponent } from "react";
import "./App.css";
import { Navbar, Nav } from "react-bootstrap";
import { D3Charts } from "./modules/d3";

export class App extends PureComponent {
  state = {
    module: "d3",
  };

  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="sm">
          <Navbar.Brand href="#d3">Charts</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" variant="pills" defaultActiveKey="#d3">
              <Nav.Link href="#d3" onClick={this.selectModule("d3")}>
                D3.js
              </Nav.Link>
              <Nav.Link href="#dc" onClick={this.selectModule("dc")}>
                Dc.js
              </Nav.Link>
              <Nav.Link href="#svg" onClick={this.selectModule("svg")}>
                svg
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>{this.renderModule()}</div>
      </div>
    );
  }

  renderModule = () => {
    const { module } = this.state;

    switch (module) {
      case "d3":
        return <D3Charts />;

      case "dc":
        return null;

      case "svg":
        return null;
    }
  };

  selectModule = (module) => () => {
    this.setState({ module });
  };
}
