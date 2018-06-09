const conn = require('./conn');

const { Sequelize } = conn;

const Apartment = conn.define('apartment', {
  name: Sequelize.STRING
});

module.exports = Apartment;
