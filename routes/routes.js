const express = require("express")
const router = express.Router()
const passport = require("passport")
const validator = require("../controllers/validator")
const userController = require("../controllers/userControllers")
const productosController = require("../controllers/productosController")
const nodemailer = require("nodemailer")
const {google} = require("googleapis")
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  "111498414684-specl4tg3bs5nscj9faknua8im4qhcqi.apps.googleusercontent.com",
  "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",
  "https://developers.google.com/oauthplayground"
)

oauth2Client.setCredentials({
  refresh_token:
    "1//04VeFxBn_bk0zCgYIARAAGAQSNwF-L9IrD8Nqa6EWesPTCm1AHZSxKFO1LnvprbEWqBPafxBTUv2_2mAHWUbRULUPucb9I-Cmkto",
})
const accessToken = oauth2Client.getAccessToken()

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
  modificarProductos,
} = productosController

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "afelipecastillog@gmail.com",
    clientId:
      "111498414684-specl4tg3bs5nscj9faknua8im4qhcqi.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04VeFxBn_bk0zCgYIARAAGAQSNwF-L9IrD8Nqa6EWesPTCm1AHZSxKFO1LnvprbEWqBPafxBTUv2_2mAHWUbRULUPucb9I-Cmkto",
    accessToken: accessToken,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

smtpTransport.verify((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Ready to send")
  }
})

router.route("/contact").post((req, res) => {
  const {name, email, message} = req.body
  const mail = {
    from: name,
    to: "useremailverifyHexagon@gmail.com",
    subject: "Contact Form Submission",
    html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    `,
  }
  smtpTransport.sendMail(mail, (error) => {
    if (error) {
      res.json({status: "Error sending maiil"})
    } else {
      res.json({status: "Message sent!"})
    }
  })
})

router
  .route("/productos")
  .get(obtenerProductos)
  .post(agregarProducto)
  .put(modificarProductos)

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
router
  .route("/address/newAddress")
  .post(
    passport.authenticate("jwt", {session: false}),
    userController.newAddress
  )
  .get(
    passport.authenticate("jwt", {session: false}),
    userController.checkAddress
  )

module.exports = router
