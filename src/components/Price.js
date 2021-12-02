import React from "react";
import { getCurrencySymbol } from "../utils";

class Price extends React.Component {
  render() {
    const price = this.props.prices.find(
      ({ currency }) => currency === this.props.currency
    );

    return (
      <h3 className="price">{`${getCurrencySymbol(price.currency)} ${
        price.amount
      }`}</h3>
    );
  }
}

export default Price;
