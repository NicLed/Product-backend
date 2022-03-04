const { Pool, Client } = require('pg');
const { DB_CONFIG } = require('../config.js');

const pool = new Pool(DB_CONFIG);

const getProducts = (count = 5) => {
  return pool.query('SELECT * FROM products WHERE id <= $1', [count])
}

const getProductById = (productId = 1) => {
  return pool.query('SELECT row_to_json(prod) as products FROM (select *, (SELECT json_agg(feat) FROM (SELECT feature, value FROM features WHERE product_id = $1) feat ) as features FROM products) prod WHERE id = $1', [productId]);
};

const getStylesById = (productId = 1) => {
  return pool.query('SELECT row_to_json(prod) as products FROM (SELECT p.id, (SELECT json_agg(sty) FROM (SELECT s.id, s.name, s.original_price, s.sale_price, s.default_style, (SELECT json_agg(phot) FROM (SELECT thumbnail_url, url FROM photos WHERE s.id = styleId) phot) as photos FROM styles as s WHERE product_id = $1) sty) as results FROM products as p) prod WHERE id = $1', [productId]);
};

module.exports = {
  pool: pool,
  getProducts: getProducts,
  getProductById: getProductById,
  getStylesById: getStylesById
}


// SELECT row_to_json(prod) as products
// FROM (
//   select p.id, p.name, p.slogan, p.description, p.category, p.default_price,
//   (SELECT json_agg(feat)
//   FROM (
//     SELECT feature, value FROM features WHERE product_id = $1)
//     feat )
//     as features FROM products as p)
//     prod WHERE id = $1



// SELECT row_to_json(prod) as products
// FROM (
//   SELECT p.id, (SELECT json_agg(sty) as styles
//   FROM (
//     SELECT *, (SELECT json_agg(phot) as photos
//     FROM (
//       SELECT thumbnail_url, url)
//       FROM photos WHERE styleId = s.id,
//     FROM (
//       SELECT json_build_object(
//         id, json_build_object(
//           "quantity", quantity,
//           "size", size)
//           FROM skus WHERE styleId = s.id)
//           as skus FROM styles as s)
//           sty WHERE product_id = $1)
//           FROM styles WHERE product_id = $1)
//           as styles FROM products as p)
//           prod WHERE product_id = $1

// SELECT row_to_json(prod) as products
// FROM (
//   SELECT p.id, (SELECT json_agg(sty)
//   FROM (
//     SELECT s.id, s.name, s.original_price, s.sale_price, s.default_style, (SELECT json_agg(phot)
//     FROM (
//       SELECT thumbnail_url, url FROM photos WHERE s.id = styleId) phot) as photos FROM styles as s WHERE product_id = $1),
//       json_build_object(sk.id, json_build_object(
//         "quantity", sk.quantity,
//         "size", sk.size
//       ) FROM skus as sk WHERE product_id = $1) sty)
// as results FROM products as p) prod WHERE id = $1

// SELECT row_to_json(prod) as products FROM (SELECT p.id, (SELECT json_agg(sty) FROM (SELECT s.id, s.name, s.original_price, s.sale_price, s.default_style, (SELECT json_agg(phot) FROM (SELECT thumbnail_url, url FROM photos WHERE s.id = styleId) phot) as photos FROM styles as s WHERE product_id = $1), json_build_object(sk.id, json_build_object("quantity", sk.quantity, "size", sk.size) FROM skus as sk WHERE product_id = $1) sty) as results FROM products as p) prod WHERE id = $1