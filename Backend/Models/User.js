module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        }
        ,
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.STRING,
            defaultValue: "user"
        }
        
    }, {
        timestamps: false
    });

    User.associate = (models) => {
        User.hasmany(models.Cart, {
            foreignKey: 'user_id',
            as: 'cartItems'
        });
    };

    return User;
}