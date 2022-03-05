const express = require('express');
const path = require('path');
const axios = require('axios');
const db = require('../database/index.js');

const PORT = 3000;
const app = express();

// app.use(express.static(path.join(__dirname, )));
app.use(express.json());

// Routes
// GET /products
app.get('/products', (req, res) => {
  // console.log(req.query)
  const count = req.query.count;
  db.getProducts(count)
  .then((data) => {
    res.status(200).send(data.rows);
  })
  .catch((error) => {
    console.log(error);
    res.status(404).send('Sorry, couldn\'t find that for you.');
  })
})

// GET /products/:product_id
app.get('/products/:product_id', (req, res) => {
  // console.log(req.params)
  const productId = req.params.product_id;
  db.getProductById(productId)
  .then((data) => {
    // console.log(data.rows[0]);
    res.status(200).send(data.rows[0].products);
  })
  .catch((error) => {
    console.log(error);
    res.status(404).send('Sorry, couldn\'t find that for you.')
  })
})

// GET /products/:prduct_id/styles
app.get('/products/:product_id/styles', (req, res) => {
  // console.log(req.params)
  const productId = req.params.product_id;
  db.getStylesById(productId)
  .then((data) => {
    // console.log(data.rows[0]);
    res.status(200).send(data.rows[0].products);
  })
  .catch((error) => {
    console.log(error);
    res.status(404).send('Sorry, couldn\'t find that for you.')
  })
})

// GET /products/:product_id/related
app.get('/products/:product_id/related', (req, res) => {
  // console.log(req.params)
  const productId = req.params.product_id;
  db.getRelatedProducts(productId)
  .then((data) => {
    // console.log(data.rows[0]);
    res.status(200).send(data.rows);
  })
  .catch((error) => {
    console.log(error);
    res.status(404).send('Sorry, couldn\'t find that for you.')
  })
})

// GET /cart
// POST /cart

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))