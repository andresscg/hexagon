const Producto = require("../models/Producto")

const productosController = {
  obtenerProductos: async (req, res) => {
    let productos

    try {
      productos = await Producto.find()
    } catch (error) {
      console.error(error)
    }

    res.json({
      respuesta: productos.length > 0 ? productos : "no hay productos",
      success: productos.length > 0 ? true : false,
    })
  },

  obtenerProducto: (req, res) => {
    const id = req.params.id
    Producto.findOne({_id: id})
      .then((respuesta) => res.json({respuesta}))
      .catch((err) => console.error(err))
  },

  agregarProducto: (req, res) => {
    const {
      nombre,
      imagen,
      descripcion,
      marca,
      categoria,
      precio,
      contadorStock,
      calificacion,
      numReseñas,
    } = req.body
    new Producto({
      nombre,
      imagen,
      descripcion,
      marca,
      categoria,
      precio,
      contadorStock,
      calificacion,
      numReseñas,
    })
      .save()
      .then((respuesta) => res.json({respuesta}))
  },
  borrarUnProducto: async (req, res) => {
    let producto
    const id = req.params.id
    try {
      producto = await Producto.findOneAndDelete({_id: id})
    } catch (error) {
      console.log(error)
    }
    res.json({respuesta: producto, success: true})
  },

  modificarUnProducto: async (req, res) => {
    let id = req.params.id
    let productos = req.body
    let actualizado
    try {
      actualizado = await Producto.findOneAndUpdate({_id: id}, producto, {
        new: true,
      })
    } catch (error) {
      console.log(error)
    }
    res.json({success: actualizado ? true : false})
  },
  modificarProductos: async (req, res) => {
    let {items} = req.body
    console.log(req.body)
    try {
      var updates = items.map(
        async (item) =>
          await Producto.findOneAndUpdate(
            {_id: item.id},
            {
              $inc: {
                contadorStock: -item.quantity,
              },
            },
            {new: true}
          )
      )
      Promise.all(updates).then(function (results) {
        console.log(results)
      })
    } catch (error) {
      console.log(error)
    }
    /* res.json({success: updates ? true : false}) */
  },

  likeDislikeProduct: (req, res) => {
    console.log(req.params)
    Producto.findOne({_id: req.params.id})
      .then((producto) => {
        if (producto.likes.includes(req.user._id)) {
          Producto.findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {likes: req.user._id}},
            {new: true}
          )
            .then((newProduct) =>
              res.json({success: true, response: newProduct.likes})
            )
            .catch((error) => console.log(error))
        } else {
          Producto.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {likes: req.user._id}},
            {new: true}
          )
            .then((newProduct) =>
              res.json({success: true, response: newProduct.likes})
            )
            .catch((error) => console.log(error))
        }
      })
      .catch((error) => res.json({success: false, response: error}))
  },

  comentario: async (req, res) => {
    switch (req.body.type) {
      case "addComment":
        try {
          const newComment = await Producto.findOneAndUpdate(
            {_id: req.params.id},
            {
              $push: {
                comentario: {comment: req.body.comment, userId: req.user._id},
              },
            },
            {new: true}
          ).populate("comentario.userId")
          if (newComment) {
            res.json({success: true, response: newComment.comentario})
          } else {
            throw new Error()
          }
        } catch (error) {
          res.json({success: false, response: error})
        }

        break
      case "editComment":
        try {
          const updatedComment = await Producto.findOneAndUpdate(
            {"comentario._id": req.params.id},
            {$set: {"comentario.$.comment": req.body.comment}},
            {new: true}
          )
          if (updatedComment) {
            res.json({success: true, response: updatedComment.comentario})
          } else {
            throw new Error()
          }
        } catch (error) {
          res.json({success: false, response: error.message})
        }
        break
      case "deleteComment":
        try {
          const commentDeleted = await Producto.findOneAndUpdate(
            {"comentario._id": req.body.idComment},
            {$pull: {comentario: {_id: req.body.idComment}}}
          )
          if (commentDeleted) {
            res.json({success: true})
          } else {
            throw new Error()
          }
        } catch (error) {
          res.json({success: false, response: error})
        }
        break
    }
  },
}

module.exports = productosController
