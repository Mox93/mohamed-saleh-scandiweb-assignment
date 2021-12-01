import React from "react";
import { getCurrencySymbol } from "../utils";

class Price extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <h3 className="price">{`${getCurrencySymbol(data.currency)} ${
        data.amount
      }`}</h3>
    );
  }
}

export default Price;
