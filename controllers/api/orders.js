const Product = require('../../models/product')

const dataController = {
    // Index,
    index (req, res, next) {
      Product.find({ }, (err, foundProducts) => {
        if (err) {
          res.status(400).send({
            msg: err.message
          })
        } else {
          res.locals.data.product = foundProducts
          next()
        }
      })
    },
// Destroy
destroy (req, res, next) {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.product = deletedProduct
        next()
      }
    })
  },
  // Update
  update (req, res, next) {
    req.body.readyToEat = req.body.readyToEat === 'on'
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedProduct) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.product = updatedProduct
        next()
      }
    })
  },
    // Create
    create (req, res, next) {
        req.body.readyToEat = req.body.readyToEat === 'on'
        Product.create(req.body, (err, createdProduct) => {
          if (err) {
            res.status(400).send({
              msg: err.message
            })
          } else {
            res.locals.data.product = createdProduct
            next()
          }
        })
      },
        // Edit
  // Show
  show (req, res, next) {
    Product.findById(req.params.id, (err, foundProduct) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: 'Could not find a product with that ID'
        })
      } else {
        res.locals.data.product = foundProduct
        next()
      }
    })
  }
}
const apiController = {
    index (req, res, next) {
      res.json(res.locals.data.products)
    },
    show (req, res, next) {
      res.json(res.locals.data.product)
    }
  }
module.exports = { dataController, apiController }
