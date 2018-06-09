const conn = require('./conn');

const { Sequelize } = conn;

const Building = conn.define('building', {
  name: Sequelize.STRING
});

module.exports = Building;
