// Desc: Initializes Sequelize and defines model relationships
// Sequelize is an Object-Relational Mapper – meaning that it maps an object syntax onto our database schemas.
//A Model is a representation of a database table in your application.

const {Sequelize, DataTypes } = require('sequelize'); //get sequelize
require('dotenv').config(); //grab env variables

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_DATABASE_PORT,
    database: process.env.MYSQL_DATABASENAME,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    
}); //starts the connection to the database

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = require('./Product')(sequelize, DataTypes);
db.User = require('./User')(sequelize, DataTypes);
db.CartItem = require('./CartItems')(sequelize, DataTypes);

db.User.hasMany(db.CartItem, {//one user can have many cart items
    foreignKey: 'user_id',
    as: 'cartItems',
    onDelete: 'CASCADE'//if user is deleted, delete their cart items
});

db.Product.hasMany(db.CartItem, {
    foreignKey: 'product_id',
    as: 'cartItems',
    onDelete: 'CASCADE'
});

db.CartItem.belongsTo(db.Product, {//each cart item belongs to one product (basically describes the foreign keys)
    foreignKey: 'product_id',
    as: 'product',
});

db.CartItem.belongsTo(db.User, {
    foreignKey: 'user_id',
    as: 'user',
});

module.exports = db;

