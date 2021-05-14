const express = require ('express');
let router = express.Router();
const db = require('./queries')

router
  .route('/')
  .get((req, res) => {
    var count = req.query.count;
    db.getProducts(count = 5)
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        res.status(400).send(err);
      })
  })

  router
    .route('/:id')
    .get((req, res) => {
      db.getProductById(req.params.id)
        .then((data) => {
          res.send(data)
        })
        .catch((err) => {
          res.status(400).send(err);
        })
    })

  router
    .route('/:id/styles')
    .get((req, res) => {
      db.getStylesById(req.params.id)
        .then((data) => {
          res.send(data)
        })
        .catch((err) => {
          res.status(400).send(err);
        })
    })


    router
    .route('/:id/related')
    .get((req, res) => {
      db.getRelated(req.params.id)
        .then((data) => {
          res.send(data)
        })
        .catch((err) => {
          res.status(400).send(err);
        })
    })





  module.exports = router;