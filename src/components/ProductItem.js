import React from "react";
import { Link } from "react-router-dom";

import Price from "./Price";
import cartWhite from "../assets/cartWhite.svg";

class ProductItem extends React.Component {
  render() {
    return (
      <Link
        className={`product-item ${this.props.inStock ? "" : "out-of-stock"}`}
        to={`/products/${this.props.id}?${this.props.params}`}
      >
        <div
          className="image"
          style={{ backgroundImage: `url(${this.props.gallery[0]})` }}
        >
          {this.props.inStock ? null : (
            <h3 className="message">out of stock</h3>
          )}
        </div>
        <button
          className="cart-icon"
          onClick={(e) => {
            e.preventDefault();
            console.log(this.props);
          }}
        >
          <img src={cartWhite} alt="cart" />
        </button>
        <h3 className="name">{this.props.name}</h3>
        <Price prices={this.props.prices} currency={this.props.currency} />
      </Link>
    );
  }
}

export default ProductItem;
