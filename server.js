const express = require('express');
const routes = require('./controller');
const sequelize = require('./config/connection');
const app = express();
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
// require.apply('dotenv').config

// console.log(cloudinary.config().cloud_name);



cloudinary.config({ 
  cloud_name: process.env.NAME, 
  api_key: process.env.KEY, 
  api_secret: process.env.SECRET
});


const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Sessions configuration
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'Assembled coders secret!',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const PORT = process.env.PORT || 3001;
// Session middleware
app.use(session(sess));

// turn on routes
app.use(routes);
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});








