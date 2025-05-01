module.exports = (sequelize, DataTypes) => { 
    const CartItem = sequelize.define('CartItem', {
        cart_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
            },
        },
    }, {
        timestamps: false,
    });

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product',
        });
        CartItem.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
    };

    return CartItem;
};