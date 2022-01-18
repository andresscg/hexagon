const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")

const sendEmail = async (email, uniqueString) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "useremailverifyhexagon@gmail.com",
      pass: "Hexagon2022",
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  let sender = "useremailverifyHexagon@gmail.com"
  let mailOptions = {
    from: sender,
    to: email,
    subject: "Verificacion de email usuario ",
    html: `
    <div>
        <img style="display: block;
        margin-left: auto;
        margin-right: auto;
        width: 100px;
        height:100px;" src='https://i.imgur.com/GjurQqE.png' alt='logo Hexagon'/>
        <h2 style="text-align:center;  font-size: 1.5rem;">Gracias por registrarte con nosotros!</h2>
        <p style="text-align:center">Con tu cuenta podras:Comprar, comentar dar Likes</p>
        <p style="text-align:center; font-size: 1.2rem;">Por favor, para verificar tu correo, haz click <a href=https://hexagon-techstore.herokuapp.com/api/verify/${uniqueString}>aqui</a>aqui</a></p>
    </div>`,
  }
  await transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
    } else {
      console.log("Mensaje enviado")
    }
  })
}

const userController = {
  newUser: async (req, res) => {
    let {firstName, lastName, email, password, google, photo, admin} = req.body

    try {
      const userExist = await User.findOne({email})

      if (userExist) {
        if (google) {
          const contraseñaHasheada = bcryptjs.hashSync(password, 10)
          userExist.password = contraseñaHasheada
          userExist.emailVerified = true
          userExist.google = true
          userExist.save()
          res.json({
            success: true,
            message: "You can sign in with Google",
          })
        } else {
          res.json({
            success: false,
            response: "Username already in use",
          })
        }
      } else {
        var uniqueString = crypto.randomBytes(15).toString("hex")

        let emailVerified = false

        const contraseñaHasheada = bcryptjs.hashSync(password, 10)
        const nuevoUsuario = new User({
          firstName,
          lastName,
          email,
          password: contraseñaHasheada,
          uniqueString,
          emailVerified,
          photo,
          admin,
          google,
        })

        const token = jwt.sign({...nuevoUsuario}, process.env.SECRETKEY)

        if (google) {
          nuevoUsuario.emailVerified = true
          nuevoUsuario.google = true
          nuevoUsuario.isConected = false
          await nuevoUsuario.save()
          res.json({
            success: true,
            response: {token, nuevoUsuario},
            message: "Awesome! You created your account with Google",
          })
        } else {
          emailVerified = false
          nuevoUsuario.google = false
          nuevoUsuario.isConected = false
          await nuevoUsuario.save()
          await sendEmail(email, uniqueString)

          res.json({
            success: true,
            response: {token, nuevoUsuario},
            message:
              "We sent you an email to verify your account, please check your inbox.",
          })
        }
      }
    } catch (error) {
      console.log(error)
      res.json({success: false, response: null, errors: errors})
    }
  },
  logUser: async (req, res) => {
    const {email, password, isGoogle} = req.body
    try {
      let user = await User.findOne({email})
      if (user) {
        /* if (!user.emailVerified) {
          return res.json({
            success: false,
            response: null,
            errors: "Por favor verifica tu correo antes de ingresar",
          })
        } */
        let samePassword = user
          ? bcryptjs.compareSync(password, user.password)
          : false
        if (user && samePassword) {
          const token = jwt.sign({user}, process.env.SECRETKEY)
          res.json({
            success: true,
            user: user,
            errors: null,
            token: token,
          })
        } else if (user.google && !isGoogle) {
          res.json({
            success: false,
            user: null,
            errors: "Invalid Email",
          })
        } else {
          res.json({
            success: false,
            user: null,
            errors: "Invalid Email or Password",
          })
        }
      } else {
        res.json({
          success: false,
          user: null,
          errors: "Email already in use",
        })
      }
    } catch (e) {
      res.json({success: false, errors: e.message, user: null})
    }
  },
  token: (req, res) => {
    res.json({user: req.user})
  },
  getUsers: async (req, res) => {
    try {
      let users = await User.find()
      res.json({success: true, error: null, response: users})
    } catch (e) {
      res.json({success: false, error: e, response: null})
      console.error(e)
    }
  },
  modifyUser: async (req, res) => {
    const {id} = req.body
    try {
      let editedUser = await User.findOneAndUpdate(
        {_id: id},
        {...req.body},
        {new: true}
      )
      res.json({success: true, error: null, response: editedUser})
    } catch (e) {
      res.json({success: false, error: e, response: null})
      console.error(e)
    }
  },
  deleteUser: async (req, res) => {
    const {id} = req.body
    try {
      let deletedUser = await User.findOneAndDelete({_id: id})
      res.json({success: true, error: null, response: deletedUser})
    } catch (e) {
      res.json({success: false, error: e, response: null})
      console.error(e)
    }
  },
  authUser: (req, res) => {
    try {
      const userAuth = req.user
      res.json({success: true, response: userAuth, error: null})
    } catch (e) {
      res.json({success: false, response: null, error: e})
    }
  },
  verifyEmail: async (req, res) => {
    const {uniqueString} = req.params

    const user = await User.findOne({uniqueString: uniqueString})
    if (user) {
      user.emailVerified = true
      await user.save()
      res.redirect("https://hexagon-techstore.herokuapp.com/")
    } else {
      res.json({success: false, response: "Your e-mail hasn't been verified."})
    }
  },
  byGoogle: async (req, res) => {
    const grupo = await User.aggregate([
      {
        $group: {
          _id: {
            createdAt: "$createdAt",
          },
          usersThisDay: {$sum: 1},
        },
      },
    ])
    res.json(grupo)
  },
}

module.exports = userController
