## TechStacks + Libraries used

- Frontend - React
- Backend - Node/Express
- Database - Postgres
- [Sequelize](https://sequelize.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [Axios](https://github.com/axios/axios)
- [Material Ui](https://material-ui.com/)
## Setup

- First please clone this repo onto your desktop directory.
Two ways to set up:
1. Docker
2. Manually with `npm`

### Docker
1. From the root directory, please run
```
    docker compose up
```
### Manual
1. You'll need postgres installed on your local machine.
2. Once Postgres is installed, you'll need to create a database for this exercise. Please name the database 'magic'. From psql, you'd need to so something like:

```
psql                          // To launch the postgres terminal
create table magic           // To create the database
\q                           // Exit the terminal
psql -d magic                // to relaunch the terminal, but connected specifically to your new database.
```

3. Once you have the database created, you're ready to run the server. Navigate back to the root directory, and run:
```
cd server
npm install
npm run start
```
4. We will now need to run the client. Open a new terminal tab and run
```
cd client
npm install
npm run start
```

For either methods, we can test that the client works by going to the below URL and we should see a form.
```
http://localhost:3000/
```

We can also test that we are properly connected to the server by going to
```
http://localhost:3001/api/products/1
```

You should get a JSON response back from the server:
```
{
    "id":1,
    "name":"Magic Potion",
    "description":"Awesome's new revolutionary awesome skin product!",
    "price":49.99,
    "maxPurchase":3
}
```