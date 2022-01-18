const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const Address = require("../models/Address")
const {sendEmail} = require("../config/emailer")

const userController = {
  newUser: async (req, res) => {
    // let {firstName, lastName, email, password, google, photo, admin} = req.body
    console.log(req.file)
    const firstName = req.body.name
    const lastName = req.body.lastname
    const email = req.body.email
    const password = req.body.password
    const google = req.body.google
    const admin = req.body.admin
    const photo = req.file.filename

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
            message: "You can login with Google",
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
          country,
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
      res.json({success: false, response: null, errors: "errors"})
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
  newAddress: async (req, res) => {
    let {country, state, city, name, address, phone} = req.body

    try {
      const newAddressDirection = new Address({
        country,
        state,
        city,
        name,
        address,
        phone,
        user: req.user._id,
      })

      await newAddressDirection.save()
      res.json({
        success: true,
        response: newAddressDirection,
        message: "New address registered",
      })
    } catch (error) {
      console.log(error)
      res.json({success: false, response: null, errors: error})
    }
  },
  checkAddress: async (req, res) => {
    console.log("si")
    console.log(req.user._id)
    let address = await Address.findOne({user: req.user._id})
    console.log(address)

    res.json({
      success: true,
      response: address,
      errors: null,
    })
  },
}

module.exports = userController
