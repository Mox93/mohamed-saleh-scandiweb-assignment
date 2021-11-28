import React from "react";
import { getCurrencySymbol } from "../utils";
import cartWhite from "../assets/cartWhite.svg";

class ProductItem extends React.Component {
  render() {
    const product = this.props.product;
    const price = product.prices.find(
      ({ currency }) => currency === this.props.currency
    );

    return (
      <div className={`product-item ${product.inStock ? "" : "out-of-stock"}`}>
        <div className="image">
          {product.inStock ? null : <h3 className="message">out of stock</h3>}
          <img src={product.gallery[0]} alt="product" />
        </div>
        <button className="cart-icon">
          <img src={cartWhite} alt="cart" />
        </button>
        <h3 className="name">{product.name}</h3>
        <h3 className="price">{`${getCurrencySymbol(price.currency)} ${
          price.amount
        }`}</h3>
      </div>
    );
  }
}

export default ProductItem;
