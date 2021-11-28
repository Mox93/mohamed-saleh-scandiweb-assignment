import React from "react";
import ProductItem from "../components/ProductItem";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = STATE;
  }

  render() {
    return (
      <div className="category-page">
        <h1 className="title">{this.props.category}</h1>
        <div className="grid-container">
          {this.state.products.map((product) => (
            <ProductItem key={product.id} product={product} currency={"USD"} />
          ))}
        </div>
      </div>
    );
  }
}

export default Category;

const STATE = {
  products: [
    {
      id: "huarache-x-stussy-le",
      name: "Nike Air Huarache Le",
      prices: [
        {
          currency: "USD",
          amount: 144.69,
        },
        {
          currency: "GBP",
          amount: 104,
        },
        {
          currency: "AUD",
          amount: 186.65,
        },
        {
          currency: "JPY",
          amount: 15625.24,
        },
        {
          currency: "RUB",
          amount: 10941.76,
        },
      ],
      gallery: [
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
        "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
      ],
      inStock: true,
    },
    {
      id: "jacket-canada-goosee",
      name: "Jacket",
      prices: [
        {
          currency: "USD",
          amount: 518.47,
        },
        {
          currency: "GBP",
          amount: 372.67,
        },
        {
          currency: "AUD",
          amount: 668.83,
        },
        {
          currency: "JPY",
          amount: 55990.46,
        },
        {
          currency: "RUB",
          amount: 39207.96,
        },
      ],
      gallery: [
        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg",
        "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016111/product-image/2409L_61_e.jpg",
      ],
      inStock: false,
    },
  ],
};
