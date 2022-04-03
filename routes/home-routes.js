const withAuth = require('../utils/auth')
const router = require('express').Router();

router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    res.render('home',{layout: 'main'});
});
router.get('/home', withAuth, (req, res) => {
  console.log(req.session)
  res.render('home',{layout: 'main'});
});
router.get('/login', (req, res) => {
  res.render('login',{layout: 'main'});
});
module.exports = router;