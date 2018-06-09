const conn = require('./conn');

const { Sequelize } = conn;

const User = require('./User');
const Building = require('./Building');
const Apartment = require('./Apartment');

Apartment.belongsTo(User);
Apartment.belongsTo(Building);
User.hasMany(Apartment);

const db = {
  models: {
    User,
    Building,
    Apartment
  }, 
  syncAndSeed: ()=> {
    return conn.sync({ force: true })
      .then(()=> {
        return Promise.all([
          User.create({ name: 'moe' }),
          User.create({ name: 'larry' }),
          Building.create({ name: '666 Fifth Avenue' }),
          Building.create({ name: '10 CPW' })
        ])
      })
      .then(([moe, larry, fifthAvenue, cpw])=> {
        return Promise.all([
          Apartment.create({ userId: moe.id, buildingId: fifthAvenue.id, name: 'PH'}),
          Apartment.create({ userId: moe.id, buildingId: fifthAvenue.id, name: '8J'}),
          Apartment.create({ userId: moe.id, buildingId: cpw.id, name: 'PH1'}),
          Apartment.create({ userId: larry.id, buildingId: cpw.id, name: 'PH2'}),
        ]);
      });
  }
};

module.exports = db;
