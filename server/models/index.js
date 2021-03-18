if (!global.hasOwnProperty('db')) {
    const { Sequelize, sequelize} = require('../config/database');

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize,

        User: require(__dirname + '/user')(sequelize, Sequelize.DataTypes),
        Product: require(__dirname + '/product')(sequelize, Sequelize.DataTypes),
        Order: require(__dirname + '/order')(sequelize, Sequelize.DataTypes),
    }

    global.db.User.hasMany(global.db.Order, { foreignKey: 'userId' });
    global.db.Order.belongsTo(global.db.User, { foreignKey: 'userId' });

    global.db.Order.belongsTo(global.db.Product, { foreignKey: 'productId' });

}