const conn = require('./conn');

const { Sequelize } = conn;

const User = conn.define('user', {
  name: Sequelize.STRING
});

User.prototype.getBuildings = function(){
  return conn.models.apartment.findAll({
    where: {
      userId: this.id
    },
    include: [
      conn.models.building
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

module.exports = User;
