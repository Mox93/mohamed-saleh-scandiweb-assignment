import React from "react";
import DOMPurify from "dompurify";

import ProductAttributes from "./ProductAttributes";
import Price from "./Price";
import { SettingsContext } from "../context/settings";

class ProductDetails extends React.Component {
  static contextType = SettingsContext;

  render() {
    const settings = this.context;
    const data = this.props.data;

    const price = data.prices.find(
      ({ currency }) => currency === settings.currencies.selected
    ) || { currency: "#", amount: "-" };

    console.log(data.description);

    return (
      <div className="product-details">
        <h2 className="title">{data.brand}</h2>
        <h2 className="subtitle">{data.name}</h2>
        <div className="attributes">
          {(data.attributes || []).map((attr) => (
            <div className="element" key={attr.id}>
              <h3 className="label">{attr.name}:</h3>
              <ProductAttributes items={attr.items} />
            </div>
          ))}
        </div>
        <div className="product-price">
          <h3 className="label">Price:</h3>
          <Price data={price} />
        </div>
        <button className="call-to-action">Add to cart</button>
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.description),
          }}
        />
      </div>
    );
  }
}

export default ProductDetails;
