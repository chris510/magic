module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        paymentId: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fulfilled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        // total: {
        //     type: DataTypes.FLOAT,
        //     allowNull: true,
        // },
    }, {
        timestamps: true,
        createdAt: 'orderDate',
    })

    return Order;
}