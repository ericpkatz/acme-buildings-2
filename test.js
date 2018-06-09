const expect = require('chai').expect;

const db = require('./db');
const { User, Apartment, Building } = db.models;

describe('my app', ()=> {
  beforeEach(()=> {
    return db.syncAndSeed();
  });
  let buildings;
  beforeEach(()=> {
    //buildings = ['666 Fifth Avenue', '10 CPW'];
    return User.findOne({ where:
      { name: 'moe'}
    })
    .then( moe => moe.getBuildings())
    .then( _buildings => buildings = _buildings);
  });

  it('moe lives at 10cpw and 666 fifth avenue', ()=> {
    expect(buildings.length).to.equal(2);
    expect(buildings).to.contain('666 Fifth Avenue');
    expect(buildings).to.contain('10 CPW');
  });

  describe('larry', ()=> {
    let larry;
    beforeEach(()=> {
      return User.findOne({
        where: { name: 'larry' },
        include: [
          Apartment
        ]
      })
      .then( _larry => larry = _larry );
    });
    it('larry has one apartment', ()=> {
      expect(larry.apartments.length).to.equal(2);
    });
  });
});
