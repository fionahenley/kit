const express = require('express');

const router = require('express').Router();
const app = express();


router.get('/', (req, res) => {
    console.log(req.session);
    res.render('main',{layout: 'index'}); 
  router.post('/login');
});

router.get('/home', (req, res) => {
  console.log(req.session)
  res.render('home',{layout: 'index'}); 
});

router.get('/login', (req, res) => {
  res.render('main',{layout: 'index'}); 
});

module.exports = router;