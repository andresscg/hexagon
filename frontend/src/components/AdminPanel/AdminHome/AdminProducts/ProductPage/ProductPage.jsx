import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons"
import axios from "axios"
import {useEffect, useRef, useState} from "react"
import {Link, useParams} from "react-router-dom"
import "../../AdminUsers/UserPage/UserPage.css"
import Moment from "react-moment"
import "moment-timezone"
import Swal from "sweetalert2"

export default function User() {
  const params = useParams()
  /*  const firstName = useRef()
  const lastName = useRef()
  const emailVerified = useRef()
  const email = useRef()
  const country = useRef()
  const admin = useRef()
  const google = useRef()
  

  function handleUpdate(e) {
    e.preventDefault()

    const modifierData = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      country: country.current.value,
      emailVerified: emailVerified.current.checked,
      google: google.current.checked,
      admin: admin.current.checked,
    }
    const token = localStorage.getItem("token")
    axios
      .put(
        "https://hexagon-techstore.herokuapp.com/api/user/modify/" +
          params.user,
        {
          modifierData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          Swal.fire(
            "Update complete!",
            "You have been update the user: " + res.data.response.firstName,
            "success"
          )
        } else {
          Swal.fire({
            icon: "error",
            title: "Error...",
            text: res.data.error.message,
          })
        }
      })
  }
 */
  const [userData, setUserData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(
        "https://hexagon-techstore.herokuapp.com/api/productos/" +
          params.product
      )
      .then((res) => {
        setLoading(false)
        setUserData(res.data)
      })
  }, [])

  console.log(userData)
  return (
    <div className="user">
      <div className="user__title-container">
        <h1 className="user__title">Edit Product</h1>
        <Link to="/newUser">
          <button className="user__add--btn">Create</button>
        </Link>
      </div>
      <div className="user__container">
        <div className="user__show">
          {!loading && userData?.respuesta?.nombre ? (
            <>
              <div className="user__show-top">
                <img
                  src={
                    userData.respuesta?.imagen.indexOf("googleusercontent") >= 0
                      ? userData.respuesta?.imagen
                      : "https://i.imgur.com/o2bJt64.png"
                  }
                  alt={userData.respuesta?.nombre}
                  className="user__show-img"
                />
                <div className="user__show-top--title">
                  <span className="user__show-username">
                    {userData.respuesta?.nombre}
                  </span>
                  <span className="user__show-user--title">
                    {userData.respuesta?.categoria}
                  </span>
                </div>
              </div>
              <div className="user__show-bottom">
                <span className="user__show-title">Created at:</span>

                <div className="user__show-info">
                  <CalendarToday className="user__show-icon" />

                  <span className="user__show-info--title">
                    <Moment format="DD/MM/YYYY HH:mm">
                      {userData.respuesta?.createdAt}
                    </Moment>
                    <p>
                      At least:{" "}
                      <Moment fromNow>{userData.response?.createdAt}</Moment>
                    </p>
                  </span>
                </div>
              </div>
            </>
          ) : loading ? (
            <h1>Loading...</h1>
          ) : (
            <h1>No data for this product</h1>
          )}
        </div>
        <div className="user__update">
          <span className="user__update--title">Edit</span>
          <form className="user__update--form" /* onSubmit={handleUpdate} */>
            {!loading && userData?.respuesta?.nombre ? (
              <>
                <div className="user__update--left">
                  <div className="user__update--item">
                    <label>Product</label>
                    <input
                      type="text"
                      placeholder={userData?.respuesta?.nombre}
                      defaultValue={userData?.respuesta?.nombre}
                      className="user__update--input"
                      /*                       ref={firstName}
                       */
                    />
                  </div>
                  <div className="user__update--item">
                    <label>Brand</label>
                    <input
                      type="text"
                      placeholder={userData?.respuesta?.marca}
                      defaultValue={userData?.respuesta?.marca}
                      className="user__update--input"
                      /*                       ref={lastName}
                       */
                    />
                  </div>
                  <div className="user__update--item">
                    <label>Category</label>
                    <input
                      type="email"
                      placeholder={userData?.respuesta?.categoria}
                      value={userData?.respuesta?.categoria}
                      className="user__update--input"
                      /*                       ref={email}
                       */
                    />
                  </div>

                  <div className="user__update--item">
                    <label>Descripcion</label>
                    <input
                      type="text"
                      defaultValue={userData?.respuesta?.descripcion}
                      className="user__update--input"
                      /*                       ref={emailVerified}
                       */
                    />
                    <label>Precio</label>
                    <input
                      type="number"
                      defaultValue={userData?.respuesta?.precio}
                      className="user__update--input"
                      /*                       ref={google}
                       */
                    />
                  </div>
                  <div className="user__update--item">
                    <label>Stock</label>
                    <input
                      type="number"
                      defaultValue={userData?.respuesta?.contadorStock}
                      className="user__update--input"
                      /*                       ref={country}
                       */
                    />
                  </div>
                </div>
                <div className="user__update--right">
                  <div className="user__update-upload">
                    <img
                      className="user__update--img"
                      src={userData?.respuesta?.imagen}
                      alt=""
                    />
                    <label htmlFor="file">
                      <Publish className="user__update--icon" />
                    </label>
                    <input type="file" id="file" style={{display: "none"}} />
                  </div>
                  <button type="submit" className="user__update--button">
                    Update
                  </button>
                </div>
              </>
            ) : loading ? (
              <h1>Loading...</h1>
            ) : (
              <h1>No data for this product</h1>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
