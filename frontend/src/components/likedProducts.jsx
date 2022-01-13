import {Dropdown } from "react-bootstrap"
import React, {useState} from 'react'
import {connect} from 'react-redux'

const LikedProducts = (props) =>{
    

    const [addProducts, setaddProducts] = useState()

    const idloggedInUser = props.user._id
    const idUserLike = props.producto.likes
    const productoValido = idloggedInUser === idUserLike
    // let productoValido;
    // idloggedInUser && (productoValido = idUserLike === idloggedInUser)
    
    const addToFavorites = () => {
        if(idUserLike > 0 && productoValido){
             setaddProducts(props.producto)
        }
    }

    return (
        <>
            <Dropdown.Item >{props.producto.nombre} </Dropdown.Item> 
      </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps) (LikedProducts)