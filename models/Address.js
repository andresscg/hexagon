const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema(
  {
    country: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: Number, required: true},
    user: {type: mongoose.Types.ObjectId, ref: "user", required: true},
  },
  {
    timestamps: true,
  }
)

const Address = mongoose.model("address", addressSchema)
module.exports = Address
