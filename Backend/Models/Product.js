

module.exports = (Sequelize, DataTypes) => {
    const Product = Sequelize.define('Product', {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        prodDescr: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },  {
            timestamps: false,
        
    });

    Product.associate = (models) => {
        Product.hasmany(models.Cart, {
            foreignKey: 'product_id',
            as: 'CartItems'
        });
    };

    return Product;
}