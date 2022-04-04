const withAuth = require('../utils/auth')
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../model');

// router.get('/', withAuth, (req, res) => {
//     res.render('home',{layout: 'main'});
// });

router.get('/', withAuth, (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['firstname']
        }
      },
      {
        model: User,
        attributes: ['firstname', 'lastname']
      }
    ]
  })
    .then(dbPostData => {
      // pass a single post object into the homepage template
      console.log(dbPostData[0]);
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('home', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/home', withAuth, (req, res) => {
  console.log(req.session)
  res.render('home',{layout: 'main'});
});

router.get('/login', (req, res) => {
  res.render('login',{layout: 'main'});
});

module.exports = router;