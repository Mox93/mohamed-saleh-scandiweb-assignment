import React from "react";

class ProductGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  componentDidUpdate() {
    if (this.props.gallery.length > 0 && !this.state.selected)
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
              // style={{ backgroundImage: `url(${image}` }}
              src={image}
              alt=""
              onClick={() => this.setState(() => ({ selected: image }))}
            />
          ))}
        </div>
        <img
          className="preview image"
          // style={{ backgroundImage: `url(${this.state.selected}` }}
          src={this.state.selected}
          alt="preview"
        />
      </div>
    );
  }
}

export default ProductGallery;
