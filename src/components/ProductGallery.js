import React from "react";

class ProductGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  componentDidMount() {
    if (!this.state.selected && this.props.gallery.length > 0)
      this.setState(() => ({ selected: this.props.gallery[0] }));
  }

  render() {
    return (
      <div className="product-gallery">
        <div className="thumbnails">
          {this.props.gallery.map((image, index) => (
            <img
              className={`image ${
                this.state.selected === image ? "selected" : ""
              }`}
              key={index}
              src={image}
              alt=""
              onClick={() => this.setState(() => ({ selected: image }))}
            />
          ))}
        </div>
        <div className="preview">
          <img src={this.state.selected} alt="preview" />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
