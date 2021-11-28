import React from "react";
import { withRouter } from "react-router-dom";
import Navbar from "./Navbar";

class Layout extends React.Component {
  render() {
    const Component = this.props.component;
    return (
      <div className="layout">
        <Navbar selected={this.props.match.params.name} />
        <Component category={this.props.match.params.name} />
      </div>
    );
  }
}

export default withRouter(Layout);
