import React from 'react'
import ContactForm from '../components/ContactForm'
import '../styles/ContactPage.css'

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact__title">
        If you have any questions, suggestions or complaints, please fill out the form below to get in touch with us.
      </h2>
      <div className="form__section">
        <ContactForm />
        <img src="/assets/contact.svg" alt="Contact" className='contact__img' />
      </div>
    </div>
  )
}

export default Contact
