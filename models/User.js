const mongoose = require("mongoose")
const moment = require("moment")
const createdAt = moment().format("DD/MM/yyyy")

const userSchema = new mongoose.Schema(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    uniqueString: {type: String, required: true},
    emailVerified: {type: Boolean, required: true},
    email: {type: String, required: true},
    photo: {type: String},
    admin: {type: Boolean, default: false},
    google: {type: Boolean, default: false},
    created: {type: String, default: createdAt, required: true},
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("user", userSchema)
module.exports = User
