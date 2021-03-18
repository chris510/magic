const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize_fixtures = require('sequelize-fixtures');
const db = require('./models');
const sampleData = require('./data/data.json');

const { orderRouter } = require('./routes/order');
const { productRouter } = require('./routes/product');

const PORT = process.env.PORT || 3001;

// Test Db
global.db.sequelize.authenticate().then(() => console.log('Database connected!')).catch((err) => console.log(err))

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(orderRouter);
app.use(productRouter);

const connectDb = async (retries = 5) => {
    while (retries) {
      try {
        await global.db.sequelize.sync({ force: true })
            .then(() => {
                sequelize_fixtures.loadFixtures(sampleData, global.db);
            }).then(() => {
                app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
            })
            .catch((error) => {
                console.log(error);
            });
        break;
      } catch (err) {
        console.log(err);
        retries -= 1;
        console.log(`retries left: ${retries}`);
        // wait 5 seconds
        await new Promise(res => setTimeout(res, 5000));
      }
    }
};

connectDb();

