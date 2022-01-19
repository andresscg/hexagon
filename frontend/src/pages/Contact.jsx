import React, {useEffect} from 'react'
import ContactForm from '../components/ContactForm'
import '../styles/ContactPage.css'

const Contact = () => {
  useEffect(() => {
    window.scroll(0,0)
  }, [])
  return (
    <div className="contact-container">
      <h2 className="contact__title">
        If you have any questions, suggestions or complaints, please fill out the form below to get in touch with us.
      </h2>
      <div className="form__section">
        <img src="/assets/contact.svg" alt="Contact" className='contact__img' />
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact
