import React, {useRef, useEffect} from "react"
import {toast} from "react-toastify"
// vendedor: sb-jpljg11313263@business.example.com
// Password: >z7cl->A

// comprador: sb-xwmdy11436535@personal.example.com
// Password : p*$LHy3&

import {useCart} from "react-use-cart"

const Paypal = (props) => {
  const {emptyCart, items} = useCart()

  const paypal = useRef()
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, error) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: props.description,
                amount: {
                  value: props.total,
                  currency_code: "USD",
                },
              },
            ],
          })
        },
        onApprove: (data, actions) => {
          let order = actions.order.capture()
<<<<<<< HEAD
=======
          props.sold(items, order)
>>>>>>> 3c82a5b87611277893e1593e6526046014a43d1e
          toast.success("Compra realizada con exito!!! ")
          emptyCart()
        },
        onError: (error) => {
          alert(`Hubo un error con la operación`)
          console.log(error)
        },
      })
      .render(paypal.current)
  }, [])
<<<<<<< HEAD
  return <div ref={paypal} style={{zIndex: -100}}></div>
}
export default Paypal
=======
  return <div ref={paypal}></div>
}
export default Paypal
>>>>>>> 3c82a5b87611277893e1593e6526046014a43d1e
