// const express = require('express');
// const sequelize = require('./config/connection')
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.static('client'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // require('./routes/htmlRoutes.js')(app);
// sequelize.sync({ force: false }).then(() => {
//       app.listen(PORT, function () {
//             console.log(`Now listening on port: ${PORT}`);
//       });
// })

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/connection');
const routes = require('./controllers/api');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get('/', (req, res) => {
  res.status(200).json({
    data: 'success',
  });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening', PORT));
});
