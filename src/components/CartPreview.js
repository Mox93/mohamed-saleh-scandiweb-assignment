import React from "react";

import arrowWhite from "../assets/arrow-white.svg";

class CartPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 };
  }

  render() {
    const gallery = this.props.gallery;

    return (
      <div
        className="image"
        style={{
          backgroundImage: `url(${gallery[this.state.selectedIndex]})`,
        }}
      >
        {gallery.length > 1 && (
          <>
            <button
              onClick={() =>
                this.setState((state) => ({
                  selectedIndex:
                    (state.selectedIndex + gallery.length - 1) % gallery.length,
                }))
              }
            >
              <img className="previous" src={arrowWhite} alt="previous" />
            </button>
            <button
              onClick={() =>
                this.setState((state) => ({
                  selectedIndex: (state.selectedIndex + 1) % gallery.length,
                }))
              }
            >
              <img className="next" src={arrowWhite} alt="next" />
            </button>
          </>
        )}
      </div>
    );
  }
}

export default CartPreview;
