import {useState} from "react"
import {Alert, Button} from "react-bootstrap"


export default function EmailVerification() {
  const [show, setShow] = useState(true)

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Email Verification</Alert.Heading>
        <p>verifica el mail bla bla bla</p>
      </Alert>
    )
  }
  return ""
}
