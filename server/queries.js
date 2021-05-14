const Pool = require('pg').Pool
const pool = new Pool({
  user: 'thecoolzone',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
})

// const getProducts = function(results = 5, request, response) {
//   pool.query(
//     `SELECT * FROM product
//     ORDER BY id
//     limit ${results}`, (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

const getProducts = (count) => {
    return pool.query(
      `SELECT * FROM product
      ORDER BY id
      limit ${count}`,)
    .then(res => {
      return res.rows
    })
    .catch(err => console.log('error'))
  }

// 'SELECT array_agg(related_product_id) FROM related WHERE current_product_id = 1'

const getProductById = (id) => {
  return pool.query(
  `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, JSON_AGG (json_build_object('feature', f.feature, 'value', f.value)) AS features FROM product AS p LEFT JOIN features AS f ON p.id = f.productid WHERE p.id=${id} GROUP BY p.id, p.name, p.slogan, p.description, p.category, p.default_price;`)
  .then(res => {
    return res.rows[0]
  })
  .catch(err => console.log('error'))
}


const getStylesById = (id) => {
  return pool.query(
    `SELECT s.*,
    JSON_AGG(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)) AS photos,
      (
        SELECT json_object_agg(id, (json_build_object('quantity', quantity, 'size', size)))
        AS skus
        FROM skus WHERE s.styleid=skus.styleid
      )
    FROM styles AS s
    LEFT JOIN photos p ON (s.styleid=p.styleid)
    WHERE s.productid=${id}
    GROUP BY s.styleid;
    `)
    .then((res) => {return res.rows[0].array_agg})
    .catch(err => console.log('error'))
}

const getRelated = (id) => {
  return pool.query(`SELECT ARRAY_AGG(related_product_id) FROM related WHERE current_product_id = ${id};`)
    .then((res) => {return res.rows[0].array_agg})
    .catch(err => console.log('error'))
}

module.exports = {
  getProducts,
  getProductById,
  getStylesById,
  getRelated
}