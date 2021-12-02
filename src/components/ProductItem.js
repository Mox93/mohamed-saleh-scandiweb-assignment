import React from "react";
import { Link } from "react-router-dom";

import cartWhite from "../assets/cartWhite.svg";
import Price from "./Price";

class ProductItem extends React.Component {
  render() {
    const params = new URLSearchParams(this.props.params);

    return (
      <Link
        className={`product-item ${this.props.inStock ? "" : "out-of-stock"}`}
        to={`/products/${this.props.id}${this.props.params}`}
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
        <Price prices={this.props.prices} currency={params.get("currency")} />
      </Link>
    );
  }
}

export default ProductItem;
