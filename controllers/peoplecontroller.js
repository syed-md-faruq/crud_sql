require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER_PG,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port:process.env.PORT
})
exports.people_get =  async (request, response) => {

  id = parseInt(request.params.id)
  console.log(id);
  pool.query('SELECT * FROM users WHERE id = $1',[id], (error, results) => {
      if(error){
          throw error
      }
      response.status(200).json(results.rows)
  })
};
exports.people_get_all =  async (request, response) => {

  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};
exports.people_post = async (request, response) => {

  const {id,first_name,last_name, email} = request.body
  console.log(id);
  pool.query('INSERT INTO users(id,first_name,last_name,email) VALUES($1,$2,$3,$4)RETURNING * ',[id,first_name,last_name,email], (error, results) => {
      if(error){
          throw error
      }
      response.send(`User Added with ID:${results.rows[0].id}`)
  })
};
exports.people_put = async (request, response) => {
  const id = parseInt(request.params.id)
  const { first_name,last_name, email } = request.body

  pool.query(
    'UPDATE users SET first_name = $1, last_name = $2,email = $3 WHERE id = $4',
    [first_name,last_name,email,id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
};
exports.people_delete = async (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
};