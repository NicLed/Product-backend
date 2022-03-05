const { Pool, Client } = require('pg');
const { DB_CONFIG } = require('../config.js');

const pool = new Pool(DB_CONFIG);

const getProducts = (count = 5) => {
  return pool.query('SELECT * FROM products LIMIT $1', [count])
}

const getProductById = (productId = 1) => {
  return pool.query('SELECT row_to_json(prod) as products FROM (select *, (SELECT json_agg(feat) FROM (SELECT feature, value FROM features WHERE product_id = $1) feat ) as features FROM products) prod WHERE id = $1', [productId]);
};

const getStylesById = (productId = 1) => {
  const photosQuery = `(SELECT json_agg(phot)
  FROM (
    SELECT thumbnail_url, url
    FROM photos WHERE s.id = styleId)
  phot) as photos`

  const skusQuery = `(SELECT json_object_agg( sk.id, json_build_object('quantity', sk.quantity, 'size', sk.size)) as skus FROM skus sk WHERE sk.styleId = s.id)`

  const stylesQuery = `SELECT row_to_json(prod) as products
  FROM (
    SELECT p.id,
    (SELECT json_agg(sty)
    FROM ( SELECT s.id, s.name, s.original_price, s.sale_price, s.default_style,
      ${photosQuery}, ${skusQuery} FROM styles as s WHERE product_id = $1
      )
    sty)
        as results FROM products as p) prod WHERE id = $1`;

  return pool.query(stylesQuery, [productId]);
};

const getRelatedProducts = (productId = 1) => {
  console.log("Related products");
}

module.exports = {
  pool: pool,
  getProducts: getProducts,
  getProductById: getProductById,
  getStylesById: getStylesById
}
