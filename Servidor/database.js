const dotenv      = require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASS,
    {
        host: process.env.HOST,
        dialect: 'mysql',
        pool:{
            max: 5,
            min:0,
            require: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize;