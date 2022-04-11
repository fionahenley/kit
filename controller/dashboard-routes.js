const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../model');
router.get('/', (req, res) => {
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      
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
            attributes: ['firstname', 'lastname', 'user_image']
          }
        },
        {
          model: User,
          attributes: ['firstname', 'lastname', 'user_image']
        }
      ]
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        const session = req.session;
        res.render('dashboard', { posts, session, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;