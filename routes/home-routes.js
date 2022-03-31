const express = require('express');

const router = require('express').Router();
const app = express();


router.get('/', (req, res) => {
    console.log(req.session);
  res.render('login'); 
  router.post('/home');
})



module.exports = router;