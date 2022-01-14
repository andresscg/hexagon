const mongoose = require("mongoose");

const criticaSchema = new mongoose.Schema(
  {
    nombre: { type: String, require: true },
    calificacion: { type: Number, require: true },
    comentario: [
      {
        comment: { type: String },
        userId: { type: mongoose.Types.ObjectId, ref: "User" },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productosSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
    nombre: { type: String, require: true },
    imagen: { type: String, require: true },
    descripcion: { type: String, require: true },
    marca: { type: String, require: true },
    categoria: { type: String, require: true },
    precio: { type: Number, require: true, default: 0 },
    contadorStock: { type: Number, require: true, default: 0 },
    criticas: [criticaSchema],
    calificacion: { type: Number, require: true, default: 0 },
    likes: { type: Array, require: true },
    numReseñas: { type: Number, require: true, default: 0 },
  },
  { timestamps: true }
);

const Producto = mongoose.model("producto", productosSchema);
module.exports = Producto;
