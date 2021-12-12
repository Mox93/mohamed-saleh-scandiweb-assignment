import React from "react";
import { withRouter } from "react-router-dom";

import ProductDetails from "../components/ProductDetails";
import ProductGallery from "../components/ProductGallery";
import { SettingsContext } from "../context/settings";
import { fetchProduct } from "../utils/requests";

class Product extends React.Component {
  static contextType = SettingsContext;

  constructor(props) {
    super(props);
    this.state = {};
    this.abortCont = new AbortController();
  }

  componentDidMount() {
    const settings = this.context;

    fetchProduct(this.props.match.params.id, {
      signal: this.abortCont.signal,
      success: (data) => {
        if (!data) {
          this.props.history.replace({
            pathname: "/products",
            search: this.props.location.search,
          });
        } else {
          this.setState(data);

          if (data.category !== settings.category) {
            settings.setCategory(data.category);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

    componentWillUnmount() {
    this.abortCont.abort();
  }

  render() {
    const settings = this.context;

    return (
      <div className="product-page container">
        {this.state.gallery && <ProductGallery gallery={this.state.gallery} />}
        {this.state.name && (
          <ProductDetails data={this.state} currency={settings.currency} />
        )}
      </div>
    );
  }
}

export default withRouter(Product);
