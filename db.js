const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db');

const User = conn.define('user', {
  name: Sequelize.STRING
});

User.prototype.getBuildings = function(){
  return Apartment.findAll({
    where: {
      userId: this.id
    },
    include: [
      Building
    ]
  })
  .then( apartments => {
    const all = apartments.map( apartment => apartment.building.name);
    return all.reduce((unique, name)=> {
      if(unique.indexOf(name) === -1){
        unique.push(name);
      }
      return unique;
    }, []);
  });
}

const Building = conn.define('building', {
  name: Sequelize.STRING
});

const Apartment = conn.define('apartment', {
  name: Sequelize.STRING
});

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
