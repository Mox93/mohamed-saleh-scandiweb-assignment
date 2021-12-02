import React from "react";
import { withRouter } from "react-router-dom";
import DOMPurify from "dompurify";

import ProductAttributes from "./ProductAttributes";
import Price from "./Price";

class ProductDetails extends React.Component {
  render() {
    const params = new URLSearchParams(this.props.location.search);

    return (
      <div className="product-details">
        <h2 className="title">{this.props.brand}</h2>
        <h2 className="subtitle">{this.props.name}</h2>
        <div className="attributes">
          {(this.props.attributes || []).map((attr) => (
            <div className="element" key={attr.id}>
              <h3 className="label">{attr.name}:</h3>
              <ProductAttributes items={attr.items} />
            </div>
          ))}
        </div>
        <div className="product-price">
          <h3 className="label">Price:</h3>
          <Price prices={this.props.prices} currency={params.get("currency")} />
        </div>
        <button className="call-to-action">Add to cart</button>
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(this.props.description),
          }}
        />
      </div>
    );
  }
}

export default withRouter(ProductDetails);
