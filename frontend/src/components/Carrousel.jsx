import {connect} from "react-redux"

import {Link} from "react-router-dom"
import Carousel from "nuka-carousel"
import "../styles/Carousel.css"

const Carrousel = (props) => {
  console.log(props.auxiliar)

  return (
    <Carousel
      autoplay={true}
      wrapAround={true}
      animation="zoom"
      cellAlign="center"
      slidesToShow={1}
      renderBottomCenterControls={null}
      height="300px"
    >
      {props.auxiliar.map((img, index) => {
        return (
          <Link to={`/shop/${img._id}`}>
            <div
              className="slide__container"
              style={{backgroundImage: `url(${img.imagen})`}}
            >
              <h4 className="slide__name">{img.nombre}</h4>
            </div>
          </Link>
        )
      })}
    </Carousel>
  )
}

const mapStateToProps = (state) => {
  return {
    auxiliar: state.productoReducer.productos,
  }
}

export default connect(mapStateToProps)(Carrousel)
