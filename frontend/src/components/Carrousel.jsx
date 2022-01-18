
import {  Card } from "react-bootstrap";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";





const Carrousel = (props) => {
   
console.log(props.auxiliar)

    const settings = {
        className: "center",
        centerMode: false,
        infinite: true,
        centerPadding: "10px",
        slidesToShow:4,
        speed: 500,
        rows: 1,
        slidesPerRow: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        dots: false,
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              slidesPerRow: 1,
              rows: 2,
              dots: false,
              arrows: false,
              infinite: true,
              autoplay: true,
              autoplaySpeed: 6000,
            },
          },
        ],
      };
    
  return (
    <>
     
      <Slider {...settings}>
            {props.auxiliar.map((img, index) => {
              return (
                <div key={index}>
                  <Card>
                      <h6>{img.nombre}</h6>
                      <Link to={`/shop/${img._id}`}>

                    <Card.Img
                      className="img-tarjeta"
                      variant="top"
                      src={img.imagen}
                    />
                      </Link>
                  </Card>
                </div>
              );
            })}
          </Slider>
    </>
  );
};

const mapStateToProps = (state) => {
    return {
      auxiliar: state.productoReducer.productos,
    }
  }
  
  
  export default connect(mapStateToProps)(Carrousel)



