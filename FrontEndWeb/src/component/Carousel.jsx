import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["./assets/categories/empire.jpg"],
  };

  handleIndexClick = (event) => {
    // console.log(this);
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    // throw new error("lol eror");
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active].image} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo.id}
              src={photo.image}
              className={index === active ? "active" : ""}
              alt="anomal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
