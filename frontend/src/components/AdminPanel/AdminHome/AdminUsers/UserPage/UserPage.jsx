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
import "./UserPage.css"
import Moment from "react-moment"
import "moment-timezone"
import Swal from "sweetalert2"

export default function User() {
  const firstName = useRef()
  const lastName = useRef()
  const emailVerified = useRef()
  const email = useRef()
  const country = useRef()
  const admin = useRef()
  const google = useRef()
  const params = useParams()

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

  const [userData, setUserData] = useState()
  const [userAddress, setUserAddress] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(
        "https://hexagon-techstore.herokuapp.com/api/user/modify/" + params.user
      )
      .then((res) => {
        setLoading(false)
        setUserData(res.data)
      })
    axios
      .get("https://hexagon-techstore.herokuapp.com/api/address/" + params.user)
      .then((res) => {
        setLoading(false)
        setUserAddress(res.data)
      })
  }, [])

  return (
    <div className="user">
      <div className="user__title-container">
        <h1 className="user__title">Edit User</h1>
        <Link to="/newUser">
          <button className="user__add--btn">Create</button>
        </Link>
      </div>
      <div className="user__container">
        <div className="user__show">
          {!loading && userData?.success && userData?.response ? (
            <>
              <div className="user__show-top">
                <img
                  src={
                    userData.response?.photo.indexOf("googleusercontent") >= 0
                      ? userData.response?.photo
                      : "https://i.imgur.com/o2bJt64.png"
                  }
                  alt={
                    userData.response?.firstName +
                    " " +
                    userData.response?.lastName
                  }
                  className="user__show-img"
                />
                <div className="user__show-top--title">
                  <span className="user__show-username">
                    {userData.response?.lastName +
                      " " +
                      userData.response?.firstName}
                  </span>
                  <span className="user__show-user--title">
                    Software Engineer
                  </span>
                </div>
              </div>
              <div className="user__show-bottom">
                <span className="user__show-title">Created at:</span>

                <div className="user__show-info">
                  <CalendarToday className="user__show-icon" />

                  <span className="user__show-info--title">
                    <Moment format="DD/MM/YYYY HH:mm">
                      {userData.response?.createdAt}
                    </Moment>
                    <p>
                      At least:{" "}
                      <Moment fromNow>{userData.response?.createdAt}</Moment>
                    </p>
                  </span>
                </div>
                <span className="user__show-title">Contact Details</span>
                <div className="user__show-info">
                  <MailOutline className="user__show-icon" />
                  <span className="user__show-info--title">
                    {userData.response?.email}
                  </span>
                </div>

                {!loading && userAddress?.response && userAddress.success && (
                  <>
                    <div className="user__show-info">
                      <LocationSearching className="user__show-icon" />
                      <span className="user__show-info--title">
                        {userAddress.response?.country +
                          ", " +
                          userAddress.response?.state +
                          ", " +
                          userAddress.response?.city +
                          ", " +
                          userAddress.response?.address}
                      </span>
                    </div>
                    <div className="user__show-info">
                      <PhoneAndroid className="user__show-icon" />
                      <span className="user__show-info--title">
                        {userAddress.response?.phone}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : loading ? (
            <h1>Loading...</h1>
          ) : (
            <h1>No data for this user</h1>
          )}
        </div>
        <div className="user__update">
          <span className="user__update--title">Edit</span>
          <form className="user__update--form" onSubmit={handleUpdate}>
            {!loading && userData?.success && userData?.response ? (
              <>
                <div className="user__update--left">
                  <div className="user__update--item">
                    <label>First name</label>
                    <input
                      type="text"
                      placeholder={userData?.response?.firstName}
                      defaultValue={userData?.response?.firstName}
                      className="user__update--input"
                      ref={firstName}
                    />
                  </div>
                  <div className="user__update--item">
                    <label>Last name</label>
                    <input
                      type="text"
                      placeholder={userData?.response?.lastName}
                      defaultValue={userData?.response?.lastName}
                      className="user__update--input"
                      ref={lastName}
                    />
                  </div>
                  <div className="user__update--item">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder={userData?.response?.email}
                      value={userData?.response?.email}
                      className="user__update--input"
                      ref={email}
                    />
                  </div>

                  <div className="user__update--item">
                    <label>Verified</label>
                    <input
                      type="checkbox"
                      defaultChecked={userData?.response?.emailVerified}
                      className="user__update--input"
                      ref={emailVerified}
                    />
                    <label>Google</label>
                    <input
                      type="checkbox"
                      defaultChecked={userData?.response?.google}
                      className="user__update--input"
                      ref={google}
                    />
                    <label>Admin</label>
                    <input
                      type="checkbox"
                      defaultChecked={userData?.response?.admin}
                      className="user__update--input"
                      ref={admin}
                    />
                  </div>
                  <div className="user__update--item">
                    <label>Country</label>
                    <input
                      type="text"
                      defaultValue={userData?.response?.country}
                      className="user__update--input"
                      ref={country}
                    />
                  </div>
                </div>
                <div className="user__update--right">
                  <div className="user__update-upload">
                    <img
                      className="user__update--img"
                      src={userData?.response?.photo}
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
              <h1>No data for this user</h1>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
