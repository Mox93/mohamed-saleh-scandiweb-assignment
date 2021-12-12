import React from "react";

import Price from "./Price";
import AmountController from "./AmountController";
import CartPreview from "./CartPreview";

class CartItem extends React.Component {
  render() {
    return (
      <div className="cart-item">
        <div className="details">
          <h2 className="title brand">{this.props.brand}</h2>
          <h2 className="title name">{this.props.name}</h2>
          <Price prices={this.props.prices} currency={this.props.currency} />
          {this.props.attributesComponent}
        </div>
        <div className="left-side">
          <AmountController {...this.props} />
          <CartPreview gallery={this.props.gallery} />
        </div>
      </div>
    );
  }
}

export default CartItem;
