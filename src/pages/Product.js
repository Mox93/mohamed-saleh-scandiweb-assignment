import React from "react";
import { withRouter } from "react-router-dom";

import ProductDetails from "../components/ProductDetails";
import ProductGallery from "../components/ProductGallery";
import { fetchProduct } from "../utils/requests";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetchProduct(this.props.match.params.id, {
      success: (data) => {
        console.log(data);
        this.setState(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  render() {
    return (
      <div className="product-page container">
        {this.state.gallery && <ProductGallery gallery={this.state.gallery} />}
        {this.state.name && <ProductDetails {...this.state} />}
      </div>
    );
  }
}

export default withRouter(Product);
