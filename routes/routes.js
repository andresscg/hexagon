const express = require("express")
const router = express.Router()
const passport = require("passport")
const validator = require("../controllers/validator")
const userController = require("../controllers/userControllers")
const productosController = require("../controllers/productosController")
const nodemailer = require("nodemailer")

router.route("/verify/:uniqueString").get(userController.verifyEmail)
router.route("/user/register").post(validator, userController.newUser)
router.route("/user/login").post(userController.logUser)
router
  .route("/user/modificar")
  .get(userController.getUsers)
  .put(userController.modifyUser)

const {
  obtenerProductos,
  agregarProducto,
  obtenerProducto,
  borrarUnProducto,
  modificarUnProducto,
  comentario,
} = productosController

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: 'andresolakase29@gmail.com',
    pass: process.env.EMAIL_PASS
  }
})

contactEmail.verify(err => {
  if(err){
    console.log(err);
  }else {
    console.log('Ready to send')
  }
})

router.route('/contact').post((req, res) => {
  const {name, email, message} = req.body
  const mail = {
    from: name,
    to: 'useremailverifyHexagon@gmail.com',
    subject: 'Contact Form Submission',
    html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    `
  }
  contactEmail.sendMail(mail, (error) => {
    if(error){
      res.json({status: 'Error sending maiil'})
    }else{
      res.json({status: 'Message sent!'})
    }
  })
})

router.route("/productos").get(obtenerProductos).post(agregarProducto)

router
  .route("/productos/:id")
  .get(obtenerProducto)
  .delete(borrarUnProducto)
  .put(modificarUnProducto)

router
  .route("/auth")
  .get(passport.authenticate("jwt", {session: false}), userController.token)

router
  .route("/productos/like/:id")
  .put(
    passport.authenticate("jwt", {session: false}),
    productosController.likeDislikeProduct
  )

router
  .route("/productos/comentario/:id")
  .put(passport.authenticate("jwt", {session: false}), comentario)

router.route("/user/getUsersByDate").get(userController.byGoogle)

module.exports = router
