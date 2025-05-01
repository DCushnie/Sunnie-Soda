const {Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    
});

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = require('./Product')(sequelize, DataTypes);
db.User = require('./User')(sequelize, DataTypes);
db.CartItem = require('./CartItems')(sequelize, DataTypes);

db.User.hasMany(db.CartItem, {
    foreignKey: 'user_id',
    as: 'cartItems',
    onDelete: 'CASCADE'
});

db.Product.hasMany(db.CartItem, {
    foreignKey: 'product_id',
    as: 'cartItems',
    onDelete: 'CASCADE'
});

db.CartItem.belongsTo(db.Product, {
    foreignKey: 'product_id',
    as: 'product',
});

db.CartItem.belongsTo(db.User, {
    foreignKey: 'user_id',
    as: 'user',
});

module.exports = db;

