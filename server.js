const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const app = express();
const session = require('express-session');

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


// HANDLEBARS
const { engine } = require('express-handlebars'); // require the express-handlebars module
app.set('view engine', 'handlebars');
app.engine('handlebars', engine({
  layoutsDir: `${__dirname}/views/layouts`
}));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.render('main',{layout: 'index'}); // Use the render method with two params, (main.handlebars, {layout: 'index'}) 1st - 'main' that points to the mainhandlebar file. 2nd - Object with layout property pointing to the index.handlebars file
})

const PORT = process.env.PORT || 3001;

// Session middleware
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});