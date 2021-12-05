import React from "react";
import Price from "./Price";

class CartItem extends React.Component {
  render() {
    const selections = [];

    for (let key in this.props.selections) {
      selections.push(
        <div className="element" key={key}>
          {this.props.selections[key]}
        </div>
      );
    }

    return (
      <div className="cart-item">
        <div className="details">
          <h2 className="title">{this.props.brand}</h2>
          <h2 className="title">{this.props.name}</h2>
          <Price prices={this.props.prices} currency={this.props.currency} />
          <div className="selections">{selections}</div>
        </div>
        <div className="amount">
          <button
            onClick={() =>
              this.props.updateAmount(
                this.props.identifier,
                this.props.amount + 1
              )
            }
          >
            +
          </button>
          {this.props.amount}
          <button
            onClick={() =>
              this.props.updateAmount(
                this.props.identifier,
                this.props.amount - 1
              )
            }
          >
            -
          </button>
        </div>
        <div className="image">
          <img src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
}

export default CartItem;
