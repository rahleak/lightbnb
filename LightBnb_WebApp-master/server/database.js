const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool  //RETURNS THE PROMISE
  .query(`SELECT * FROM users
  WHERE email = '${email}'`)
  .then((result) => result.rows[0])
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  let params = [id];
  return pool  //RETURNS THE PROMISE
  .query(`SELECT * FROM users
  WHERE id = $1`, params)
  .then((result) => result.rows[0])
  .catch((err) => {
    console.log(err.message);
  });
}

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  console.log(user);
  return pool  //RETURNS THE PROMISE
  .query(`INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`, [user.name, user.email, user.password])
  .then((result) => result.rows[0])
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`;

  const value = [guest_id, limit]
  console.log(queryString);
  return pool  //RETURNS THE PROMISE
  .query(queryString, value)
  .then((result) => result.rows)
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = function(options, limit = 10) {
  let values = [];
  
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_reviews.property_id
  `;
  
  if (options.city) {
   values.push(`%${options.city}%`);
   queryString += `WHERE city LIKE $${values.length} `;
  }
  if (options.owner_id) {
    values.push(options.owner_id);
    queryString += `AND owner_id = $${values.length}`;
  }
  if(options.minimum_price_per_night){
    values.push(options.minimum_price_per_night*100);
    queryString += `AND cost_per_night >= $${values.length}`;
  }
  if(options.maximum_price_per_night){
    values.push(options.maximum_price_per_night*100);
    queryString += `AND cost_per_night <= $${values.length}`;
  }
  queryString += `
  GROUP BY properties.id `; 
  
  if(options.minimum_rating){
    values.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${values.length} `;
  }
  
  values.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${values.length};
  `;
  
  return pool
    .query(queryString,values)
    .then(result => result.rows)
    .catch(err => console.error(err.message));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
 const addProperty = function(property) {
  const queryString = `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) 
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`;
  const values = [];
  values.push(property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, Number(property.parking_spaces), Number(property.number_of_bathrooms), Number(property.number_of_bedrooms), property.country, property.street, property.city, property.province, property.post_code);
  return pool
  .query(queryString,values)
  .then(res => res.rows)
  .catch(err => console.error(err.message));
}
exports.addProperty = addProperty;
