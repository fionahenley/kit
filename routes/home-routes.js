const withAuth =  require('../utils/auth')
const router = require('express').Router();


router.get('/', withAuth, (req, res) => {

  res.render('home',{ loggedIn: req.session.loggedIn}); 
});

router.get('/new', withAuth, (req, res) => {
  console.log(req.session)
  res.render('newPost',{ loggedIn: req.session.loggedIn}); 
});

router.get('/login', (req, res) => {
  res.render('login'); 
});

module.exports = router;