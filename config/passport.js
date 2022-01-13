const passport = require("passport")
const jwtStrategy = require("passport-jwt").Strategy
const extractJwt = require("passport-jwt").ExtractJwt
const User = require("../models/User")

module.exports = passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
    },
    (jwt_payload, done) => {
      if (jwt_payload.user) {
        User.findOne({_id: jwt_payload.user._id})
          .then((user) => {
            if (user) {
              return done(null, user)
            } else {
              return done(null, false)
            }
          })
          .catch((err) => {
            console.error(err)
            return done(err, false)
          })
      } else {
        User.findOne({_id: jwt_payload._doc._id})
          .then((user) => {
            if (user) {
              return done(null, user)
            } else {
              return done(null, false)
            }
          })
          .catch((err) => {
            console.error(err)
            return done(err, false)
          })
      }
    }
  )
)
