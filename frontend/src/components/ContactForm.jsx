import React, {useState} from "react"
import axios from "axios"
import {toast} from "react-toastify"

const ContactForm = () => {
  const [status, setStatus] = useState("Submit")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name, email, message} = e.target.elements
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    if (Object.values(details).some((value) => value === "")) {
      toast.warn("Ups! All fields are required!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      setStatus("Sending...")
      let response = await axios.post(
        "https://hexagon-techstore.herokuapp.com/api/contact",
        details
      )
      setStatus("Submit")
      toast.info(response.data.status, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      name.value = ""
      email.value = ""
      message.value = ""
    }
  }

  return (
    <div className="contactForm-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-grid">
          <div className="contact-form__input">
            <label htmlFor="name" className="form__label">
              Name:
            </label>
            <input type="text" required id="name" className="form__input" />
          </div>
          <div className="contact-form__input">
            <label htmlFor="email" className="form__label">
              Email:
            </label>
            <input type="email" required id="email" className="form__input" />
          </div>
          <div className="contact-form__input message">
            <label htmlFor="message" className="form__label">
              Message:
            </label>
            <textarea required id="message" className="form__input textarea" />
          </div>
        </div>
        <button type="submit" className="form__btn">
          {status}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
