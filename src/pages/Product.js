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
    const params = new URLSearchParams(this.props.location.search);

    fetchProduct(this.props.match.params.id, {
      success: (data) => {
        if (!data) {
          this.props.history.replace({
            pathname: "/products",
            search: this.props.location.search,
          });
        } else {
          this.setState(data);

          if (data.category !== params.get("category")) {
            console.log("NEED TO FIX");
            params.set("category", data.category);
            this.props.history.replace({ search: params.toString() });
          }
        }
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
