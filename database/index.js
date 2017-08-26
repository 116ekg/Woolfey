const Sequelize = require('sequelize');
require('dotenv').config();
require('dotenv').load();

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    pool: {
        max: 3,
        min: 0,
        idle: 1000
    }
});

db.authenticate()
.then(() => console.log('connected to db'))
.catch(err => console.log('FAILED TO CONNECT TO DB', err));

module.exports = db;