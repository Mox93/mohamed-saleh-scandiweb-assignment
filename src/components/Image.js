import React from "react";
import imageNotFound from "../assets/image-not-found.svg";

class Image extends React.Component {
  render() {
    return (
      <img
        alt=""
        {...this.props}
        onError={(e) => {
          e.onerror = null;
          if (e.target.src !== imageNotFound) {
            e.target.src = imageNotFound;
          }
        }}
      />
    );
  }
}

export default Image;
