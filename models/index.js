'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    protocol: 'postgres',
    port: 5432,
    host: 'ec2-174-129-18-98.compute-1.amazonaws.com'
  });
} else {
  sequelize = new Sequelize('example-db', 'root', null);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
