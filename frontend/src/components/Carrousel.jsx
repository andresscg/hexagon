// import {  Card, CardGroup, Carousel } from "react-bootstrap";
import {connect} from "react-redux"
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom"
import Carousel from "nuka-carousel"
import "../styles/Carousel.css"

const Carrousel = (props) => {
  console.log(props.auxiliar)

  // const settings = {
  //     className: "center",
  //     centerMode: true,
  //     infinite: true,
  //     centerPadding: "10px",
  //     slidesToShow:3,
  //     speed: 500,
  //     rows: 1,
  //     slidesPerRow: 1,
  //     autoplay: true,
  //     autoplaySpeed: 8000,
  //     dots: false,
  //     pauseOnHover: false,
  //     responsive: [
  //       {
  //         breakpoint: 800,
  //         settings: {
  //           slidesToShow: 3,
  //           slidesToScroll: 1,
  //           slidesPerRow: 1,
  //           rows: 2,
  //           dots: false,
  //           arrows: false,
  //           infinite: true,
  //           autoplay: true,
  //           autoplaySpeed: 6000,
  //         },
  //       },
  //     ],
  //   };

  return (
    // <>

    //   <Slider {...settings}>
    //         {props.auxiliar.map((img, index) => {
    //           return (
    //             <div key={index}>
    //               <Card>
    //                   <h6>{img.nombre}</h6>
    //                   <Link to={`/shop/${img._id}`}>

    //                 <Card.Img
    //                   className="img-tarjeta"
    //                   variant="top"
    //                   src={img.imagen}
    //                 />
    //                   </Link>
    //               </Card>
    //             </div>
    //           );
    //         })}
    //       </Slider>
    // </>
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
          <div
            className="slide__container"
            style={{backgroundImage: `url(${img.imagen})`}}
          >
            <h4 className="slide__name">{img.nombre}</h4>
          </div>
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
