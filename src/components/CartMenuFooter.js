import React from "react";
import { Link } from "react-router-dom";

import Price from "./Price";

class CartMenuFooter extends React.Component {
  render() {
    return (
      <div className="summery">
        <div className="total-price">
          <h3 className="label">total</h3>
          <Price
            prices={this.props.totalPrices}
            currency={this.props.currency}
          />
        </div>
        <div className="actions">
          <Link
            className="view-bag"
            to={`/cart?${this.props.params}`}
            onClick={() => this.props.close()}
          >
            view bag
          </Link>
          <button
            className="check-out"
            onClick={() => {
              this.props.close();
              alert("WE TOOK ALL YOUR MONEY MWAHAHAHAHA!!!");
            }}
          >
            check out
          </button>
        </div>
      </div>
    );
  }
}

export default CartMenuFooter;
