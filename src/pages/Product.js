import React from "react";
import { withRouter } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import ProductGallery from "../components/ProductGallery";
import { fetchProduct } from "../utils/requests";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    console.log(this.props.match);

    fetchProduct(this.props.match.params.id, {
      success: (data) => {
        console.log(data);
        this.setState({ data });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  render() {
    return (
      <div className="product-page container">
        {this.state.data && (
          <ProductGallery gallery={this.state.data.gallery} />
        )}
        {this.state.data && <ProductDetails data={this.state.data} />}
      </div>
    );
  }
}

export default withRouter(Product);
